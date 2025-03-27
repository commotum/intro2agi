# Rotary Embeddings: A Relative Revolution
Rotary Positional Embedding (RoPE) is a new type of position encoding that unifies absolute and relative approaches. We put it to the test.
April 20, 2021 · Stella Biderman, Sid Black, Charles Foster, Leo Gao, Eric Hallahan, Horace He, Ben Wang, Phil Wang

TL;DR:
Rotary Positional Embedding (RoPE) is a new type of position encoding that unifies absolute and relative approaches. Developed by Jianlin Su in a series of blog posts earlier this year [12, 13] and in a new preprint [14], it has already garnered widespread interest in some Chinese NLP circles. This post walks through the method as we understand it, with the goal of bringing it to the attention of the wider academic community. In general we have found that across a large suite of setups including regular, linear, and local self-attention, it either matches or surpasses all other methods currently available for injecting positional information into transformers.

## What's the Problem?
Since Vaswani et al., 2017 [16] there have been many schemes introduced for encoding positional information in transformers. When applying self-attention to a given domain, the choice of position encoding typically involves tradeoffs between simplicity, flexibility, and efficiency. For example, learned absolute positional encoding is very simple, but may not generalize and are not always particularly meaningful due to the common practices [1, 3, 9, 15] of packing short sentences and phrases together in a single context and breaking up sentences across contexts.

Another major limitation of existing methods is that they do not work with efficient transformers. Methods like T5's relative positional bias [10] require constructing the full $N \times N$ attention matrix between positions, which is not possible when using many of the efficient alternatives to softmax attention, including kernelized variants like FAVOR+ [2].

A principled, easy to implement, and generally-applicable method for relative position encoding---one that works for both vanilla and "efficient" attention---is of great interest. Rotary Positional Embedding (RoPE) is designed to address this need.

## What's the Solution?
In this section we introduce and derive the rotary positional embedding. We begin with discussing the intuition, before presenting a full derivation.

### Intuition
We would like to find a positional encoding function $f(\mathbf{x}, \ell)$ for an item $\mathbf{x}$ and its position $\ell$ such that, for two items $\mathbf{q}$ and $\mathbf{k}$ at positions $m$ and $n$, the inner product between $f(\mathbf{q}, m)$ and $f(\mathbf{k}, n)$ is sensitive only to the values of $\mathbf{q}, \mathbf{k}$, and their relative position $m-n$. This is related in spirit to the kernel trick: we are searching for a feature map such that its kernel has certain properties. A key piece of information is the geometric definition of the dot product between Euclidean vectors: $\mathbf{q} \cdot \mathbf{k}=\|\mathbf{q}\|\|\mathbf{k}\| \cos \left(\theta_{q k}\right)$

In plain English, the dot product between two vectors is a function of the magnitude of individual vectors and the angle between them. With this in mind, the intuition behind RoPE is that we can represent the token embeddings as complex numbers and their positions as pure rotations that we apply to them. If we shift both the query and key by the same amount, changing absolute position but not relative position, this will lead both representations to be additionally rotated in the same manner---as we will see in the derivation---thus the angle between them will remain unchanged and thus the dot product will also remain unchanged. By exploiting the nature of rotations, the dot product used in self-attention will have the property we are looking for, preserving relative positional information while discarding absolute position.

The following is an example illustrating the core idea of RoPE-a more rigorous derivation is presented in a subsequent section. Some arbitrary $0<\varepsilon \leq \frac{\pi}{2 N}$ is chosen, where $N$ is the maximum sequence length. When viewed elementwise on $\mathbf{q}$ and $\mathbf{k}$, with $j$ as the element index, RoPE can be viewed as follows:

$$
\begin{aligned} \operatorname{RoPE}(x, m) & =x e^{m i \varepsilon} \\ \left\langle\operatorname{RoPE}\left(q_j, m\right), \operatorname{RoPE}\left(k_j, n\right)\right\rangle & =\left\langle q_j e^{m i \varepsilon}, k_j e^{n i \varepsilon}\right\rangle \\ & =q_j k_j e^{m i \varepsilon} e^{n i \varepsilon} \\ & =q_j k_j e^{(m-n) i \varepsilon} \\ & =\operatorname{RoPE}\left(q_j k_j, m-n\right)\end{aligned}
$$

### Visual Intuition
<iframe src="./Waveplate Demo.html" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>
*A quarter-waveplate can change the polarization of an electromagnetic wave. (This figure is interactive, try dragging the cube!)*

To see how relative position might be preserved in this transformation, we can look to an analogous situation in classical electrodynamics.

We imagine a linearly polarized electromagnetic wave that is sent through a quarter-wave plate at an angle of 45 degrees. This takes the incoming wave and shifts its phase on only one principal dimension as it travels. When the wave emerges from the waveplate, the polarization is no longer linear---it has become circular through a shift equal to quarter of a period.

As the wave travels through the waveplate, we can see how the magnitude of the wave is preserved. We can also better see how the relative position may be encoded as the angle between subsequent timesteps: the angle between timesteps, and therefore distance along the axis of travel, is constant. This means the positional information must be orthogonal to the amplitude in the modulated wave.

### Derivation
We begin with absolute positional information: for each token, we know where it is in the sequence. However, dot products (and therefore attention) do not preserve absolute positional information, so if we encode that positional information in the absolute position of the embeddings, we will lose a significant amount of information. On the other hand, dot products do preserve relative position, so if we can encode the absolute positional information into the token embeddings in a way that only leverages relative positional information, that will be preserved by the attention function.

While it is common in machine learning to restrict our attention to the real numbers, for rotary embeddings it is mathematically more convenient to use the complex numbers as the base field for our space. Instead of working in the usual $\mathbb{R}^d$, we will work in $\mathbb{C}^{d / 2}$ by considering consecutive pairs of elements of the query and key vectors to be a single complex number. Specifically, instead of viewing $\mathbf{q}=\left(q_1, q_2, q_3, q_4, \ldots, q_d\right)$ as a $d$ -dimensional real vector we view it as $\mathbf{q}=\left(q_1+i q_2, q_3+i q_4, \ldots q_{d-1}+i q_d\right) \in \mathbb{C}^{d / 2}$. As we will see, casting it in this fashion will make discussing the rotary embeddings easier. If $d$ is odd, we can pad it with a dummy coordinate to ensure things line up correctly. Alternatively, we can simply increase $d$ by one.

Let $\mathbf{q}$ and $\mathbf{k}$ be query and key vectors respectively and let $m$ and $n$ be the absolute positions of the corresponding tokens. Let $f(\mathbf{x}, \ell)$ be the function that takes the token embedding $\mathbf{x}$ in position $\ell$ and outputs a new embedding that contains (in some fashion) the relative positional information. Our goal is to find a "nice" function $f$ that does this. Once the positional information is encoded, we need to compute the inner product like so:

$$
\langle f(\mathbf{q}, m), f(\mathbf{k}, n)\rangle=g(\mathbf{q}, \mathbf{k}, m-n)
$$

where $g(\mathbf{q}, \mathbf{k}, m-n)$ now represents the pre-softmax logit of the usual attention equation. Writing these three functions in exponential form gives

$$
\begin{aligned} f(\mathbf{q}, m) & =R_f(\mathbf{q}, m) e^{i \Theta_f(\mathbf{q}, m)} \\ f(\mathbf{k}, n) & =R_f(\mathbf{k}, n) e^{i \Theta_f(\mathbf{k}, n)} \\ g(\mathbf{q}, \mathbf{k}, m-n) & =R_g(\mathbf{q}, \mathbf{k}, m-n) e^{i \Theta_g(\mathbf{q}, \mathbf{k}, m-n)}\end{aligned}
$$

Computing the inner product and equating corresponding components yields

$$
\begin{aligned} R_f(\mathbf{q}, m) R_f(\mathbf{k}, n) & =R_g(\mathbf{q}, \mathbf{k}, m-n) \\ \Theta_f(\mathbf{q}, m)-\Theta_f(\mathbf{k}, n) & =\Theta_g(\mathbf{q}, \mathbf{k}, m-n)\end{aligned}
$$

Substituting $m=n$ and applying the initial condition $f(\mathbf{x}, 0)=\mathbf{x}$ gives

$$
R_f(\mathbf{q}, m) R_f(\mathbf{k}, m)=R_g(\mathbf{q}, \mathbf{k}, 0)=R_f(\mathbf{q}, 0) R_f(\mathbf{k}, 0)=\mathbf{q} \mathbf{k}
$$

As the prior equation is valid for all $m$, it means that $R_f$ is independent of the value of $m$, so we can set $R_f(\mathbf{x}, y)=\mathbf{x}$. Similarly, if we denote $\Theta(\mathbf{x})=\Theta_f(\mathbf{x}, 0)$ we obtain

$$
\Theta_f(\mathbf{q}, m)-\Theta_f(\mathbf{k}, m)=\Theta_g(\mathbf{q}, \mathbf{k}, 0)=\Theta_f(\mathbf{q}, 0)-\Theta_f(\mathbf{k}, 0)=\Theta(\mathbf{q})-\Theta(\mathbf{k})
$$

which implies that $\Theta_f(\mathbf{q}, m)-\Theta(\mathbf{q})=\Theta_f(\mathbf{k}, m)-\Theta(\mathbf{k})$ for all $\mathbf{q}, \mathbf{k}, m$. This allows us to decompose $\Theta_f$ as $\Theta_f(\mathbf{x}, y)=\Theta(\mathbf{x})+\varphi(y)$. Examining the case of $m=n+1$ reveals that

$$
\varphi(m)-\varphi(m-1)=\Theta_g(\mathbf{q}, \mathbf{k}, 1)+\Theta(\mathbf{q})-\Theta(\mathbf{k})
$$

Since the right-hand side does not depend on $m$, the left hand side must not either and so $\varphi$ is an arithmetic progression. Setting the initial values $\varphi(0)=0$ and $\varphi(1)=\theta$, we have $\varphi(m)=m \theta$.

Putting all of these pieces together, we get the final formula for the rotary positional embedding:

$$
f(\mathbf{q}, m)=R_f(\mathbf{q}, m) e^{i \Theta_f(\mathbf{q}, m)}=\mathbf{q} e^{i(\Theta(\mathbf{q})+m \theta)}=\sum_{j=1}^{d / 2} q_j e^{i m \theta_j} \vec{e}_j
$$

and likewise for $\mathbf{k}$. Since computers tend to like real numbers and matrices more than complex numbers, its convenient to convert this expression into the matrix equation

$$
f(\mathbf{q}, m)=\left(\begin{array}{cccc}M_1 & & & \\ & M_2 & & \\ & & \ddots & \\ & & & M_{d / 2}\end{array}\right)\left(\begin{array}{c}q_1 \\ q_2 \\ \vdots \\ q_d\end{array}\right)=\Theta_{\mathrm{m}} \mathbf{Q}_{\mathrm{m}}=\Theta_{\mathbf{m}} \mathbf{W}_{\mathbf{q}} \mathbf{X}_{\mathbf{m}}
$$

where $M_j=\left(\begin{array}{cc}\cos m \theta_j & -\sin m \theta_j \\ \sin m \theta_j & \cos m \theta_j\end{array}\right), \Theta_{\mathbf{m}}$ is the block diagonal rotation matrix, $\mathbf{W}_{\mathbf{q}}$ is the learned query weights, and $\mathbf{X}_{\mathbf{m}}$ is the embedding of the $m$ token. Again, we also have the corresponding equation for $\mathbf{k}$.

### Extension to multiple dimensions

With relative ease RoPE can be extended into the multidimensional case. To represent two dimensions, two independent 1-dimensional rotary embeddings can be used. To implement this, we can split each of $\mathbf{q}$ and $\mathbf{k}$ in half and apply rotary piece-wise as follows:

$$
\begin{align}
\langle f(\mathbf{q}, m, i), f(\mathbf{k}, n, j) \rangle 
&= \left\langle f_1\left(\mathbf{q}_{: d / 2}, m\right), f_1\left(\mathbf{k}_{: d / 2}, n\right) \right\rangle + \left\langle f_2\left(\mathbf{q}_{d / 2:}, i\right), f_2\left(\mathbf{k}_{d / 2:}, j\right) \right\rangle \\
&= g_1\left(\mathbf{q}_{: d / 2}, \mathbf{k}_{: d / 2}, m-n\right) + g_2\left(\mathbf{q}_{d / 2:}, \mathbf{k}_{d / 2:}, i-j\right) \\
&= g(\mathbf{q}, \mathbf{k}, m-n, i-j)
\end{align}
$$

This formulation can also be further extended to data of an arbitrary number of dimensions. This sort of multi-dimensional relative coding would let us, for example, implement relative timing and relative pitch embeddings similar to Music Transformer [4] in a drastically simpler manner. More generally, we believe there is potentially a large class of invariances that first-principles positional codes like RoPE may enable us to capture.

### How is this different from the sinusoidal embeddings used in "Attention is All You Need"?

A response many of us at EleutherAI had when first coming across this was "how does this differ from sinusoidal embeddings," so we feel it is worth discussing this comparison. There are two ways that rotary embeddings are different from sinusoidal embeddings:

1. Sinusoidal embeddings apply to each coordinate individually, while rotary embeddings mix pairs of coordinates
2. Sinusoidal embeddings add a $\cos (m \theta)$ or $\sin (m \theta)$ term, while rotary embeddings use a multiplicative factor.

## Okay, what About in Practice?

After reading Jianlin Su's original blog posts [12, 13], we were curious how well such a first-principles approach to positional encoding would stack up against existing methods. Despite a tremendous number of papers that have come out claiming to improve the transformer architecture, very few approaches generalize well across codebases and tasks. However, we have found that rotary positional embeddings perform as well or better than other positional techniques in every architecture we have tried.

### Implementation
A naive implementation of rotary positional embeddings would use the block diagonal matrix form shown earlier. In practice, implementing rotary positional embeddings this way is highly inefficient, and more optimized forms are readily available. The original implementations of RoPE are available in roformer and bert4keras.

Additionally, we have implemented rotary positional embeddings in x-transformers, GPT-Neo, GPT-NeoX, and Mesh Transformer JAX. Below are implimentations for PyTorch and JAX pulled from these codebases.

- <details><summary>GPT-NeoX (PyTorch)</summary>
```python
import torch

class Rotary(torch.nn.Module):
    def __init__(self, dim, base=10000):
        super().__init__()
        inv_freq = 1.0 / (base ** (torch.arange(0, dim, 2).float() / dim))
        self.register_buffer("inv_freq", inv_freq)
        self.seq_len_cached = None
        self.cos_cached = None
        self.sin_cached = None

    def forward(self, x, seq_dim=1):
        seq_len = x.shape[seq_dim]
        if seq_len != self.seq_len_cached:
            self.seq_len_cached = seq_len
            t = torch.arange(x.shape[seq_dim], device=x.device).type_as(self.inv_freq)
            freqs = torch.einsum("i,j->ij", t, self.inv_freq)
            emb = torch.cat((freqs, freqs), dim=-1).to(x.device)
            self.cos_cached = emb.cos()[:, None, None, :]
            self.sin_cached = emb.sin()[:, None, None, :]
        return self.cos_cached, self.sin_cached


# rotary pos emb helpers:

def rotate_half(x):
    x1, x2 = x[..., : x.shape[-1] // 2], x[..., x.shape[-1] // 2 :]
    return torch.cat(
        (-x2, x1), dim=x1.ndim - 1
    )  # dim=-1 triggers a bug in torch < 1.8.0


@torch.jit.script
def apply_rotary_pos_emb(q, k, cos, sin):
    return (q * cos) + (rotate_half(q) * sin), (k * cos) + (rotate_half(k) * sin)
```
</details> 

- <details><summary>Mesh Transformer JAX (JAX)</summary>
```python
import jax.numpy as jnp
import numpy as np
from einops import rearrange, repeat


def fixed_pos_embedding(x, seq_dim=0):
    dim = x.shape[-1]
    inv_freq = 1.0 / (10000 ** (np.arange(0, dim, 2) / dim))

    sinusoid_inp = np.einsum("i , j -> i j", np.arange(x.shape[seq_dim]), inv_freq)

    return np.sin(sinusoid_inp), np.cos(sinusoid_inp)


def rotate_every_two(x):
    x1 = x[:, :, ::2]
    x2 = x[:, :, 1::2]

    x = jnp.stack((-x2, x1), axis=-1)

    return rearrange(x, "... d j -> ... (d j)")


def apply_rotary_pos_emb(x, sincos):
    sin, cos = map(lambda t: repeat(t, "b n -> b (n j)", j=2)[:, None, :], sincos)
    return (x * cos) + (rotate_every_two(x) * sin)
```
</details>