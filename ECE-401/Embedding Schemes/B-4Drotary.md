So we begin with absolute positional information: for each token, we know where it is in 4D spacetime where w is a temporal component and x, y, and z are spatial components represented as q = [w, x, y, z] where each is real valued. However, dot products (and therefore attention) do not preserve absolute positional information, so if we encode that positional information in the absolute position of the embeddings, we will lose a significant amount of information. On the other hand, dot products do preserve relative position, so if we can encode absolute position, scale, and orientation information into the token embeddings in a way that only leverages relative structural and hierarchical information, that will be preserved by the attention function.

Just as it is mathematically more convenient to use the complex numbers as the base field for rotary embedding spaces, it is mathematically more convenient to use quaternions as the base field for our structural embedding space.

Instead of working in the usual $\mathbb{R}^d$, or in the rotary scheme $\mathbb{C}^{d/2}$, we will work in $\mathbb{H}^{d/4}$. Just as rotary embeddings considered consecutive pairs of elements of the query and key vectors to be a single complex number, we will consider consecutive quartets of elements of the query and key vectors to be a single quaternion.

Specifically, instead of viewing $\mathbf{q}=(q_1, q_2, q_3, q_4, \ldots, q_d)$ as a $d$-dimensional real vector (traditionally) or as $\mathbf{q}=(q_1+iq_2, q_3+iq_4, \ldots, q_{d-1}+iq_d) \in \mathbb{C}^{d/2}$ (rotary), we view it as $\mathbf{q}=(q_1 + q_2 i + q_3 j + q_4 k, q_5 + q_6 i + q_7 j + q_8 k, \ldots, q_{d-3} + q_{d-2} i + q_{d-1} j + q_d k) \in \mathbb{H}^{d/4}$.

Let $\mathbf{q}$ and $\mathbf{k}$ be query and key vectors respectively and let $m$ and $n$ be the absolute position, scale, and orientation of the corresponding tokens each written as a single quaternion. 

Let $f(\mathbf{x}, \ell)$ be the function that takes a token embedding $\mathbf{x}$ at quaternion $\ell$ and outputs a new embedding that contains (in some fashion) the relative structural and hierarchical information. Our goal is to find a "nice" function $f$ that does this. Once the positional information is encoded, we need to compute the inner product like so:

$$\langle f(\mathbf{q}, m), f(\mathbf{k}, n)\rangle = g(\mathbf{q}, \mathbf{k}, m - n)$$

where \( g(\mathbf{q}, \mathbf{k}, m - n) \) represents the pre-softmax logit of the attention equation. Writing these functions in rotational matrix form gives:

$$
\begin{aligned}
f(\mathbf{q}, m) &= R_f(\mathbf{q}, m) \cdot \Theta_f(\mathbf{q}, m) \\
f(\mathbf{k}, n) &= R_f(\mathbf{k}, n) \cdot \Theta_f(\mathbf{k}, n) \\
g(\mathbf{q}, \mathbf{k}, m - n) &= R_g(\mathbf{q}, \mathbf{k}, m - n) \cdot \Theta_g(\mathbf{q}, \mathbf{k}, m - n)
\end{aligned}
$$

Each \( \Theta_f(\mathbf{x}, m) \) is constructed as a block-diagonal matrix of \( D/4 \) quaternion-based \( 4 \times 4 \) rotation matrices:

$$
\Theta_f(\mathbf{x}, m) = \text{blockdiag}\left( R_4\left(m \cdot \theta_1 \cdot q\right), R_4\left(m \cdot \theta_2 \cdot q\right), \ldots, R_4\left(m \cdot \theta_{D/4} \cdot q\right) \right)
$$

where \( R_4(\cdot) \) is a smooth sin/cos-structured rotation matrix defined over quaternion components \([w, x, y, z]\), and each \( \theta_j \) is a frequency term associated with the \( j \)-th block.

Computing the inner product and equating corresponding components yields

$$
\begin{aligned}
f(\mathbf{q}, m) &= R_f(\mathbf{q}, m) \cdot \Theta_f(\mathbf{q}, m) \\
f(\mathbf{k}, n) &= R_f(\mathbf{k}, n) \cdot \Theta_f(\mathbf{k}, n) \\
\langle f(\mathbf{q}, m), f(\mathbf{k}, n) \rangle &= R_f(\mathbf{q}, m) R_f(\mathbf{k}, n) \cdot \langle \Theta_f(\mathbf{q}, m), \Theta_f(\mathbf{k}, n) \rangle \\
&= R_g(\mathbf{q}, \mathbf{k}, m - n) \cdot \Theta_g(\mathbf{q}, \mathbf{k}, m - n)
\end{aligned}
$$

Substituting \( m = n \) and applying the initial condition \( f(\mathbf{x}, 0) = \mathbf{x} \) gives

$$
R_f(\mathbf{q}, m) R_f(\mathbf{k}, m) = R_g(\mathbf{q}, \mathbf{k}, 0) = R_f(\mathbf{q}, 0) R_f(\mathbf{k}, 0) = \langle \mathbf{q}, \mathbf{k} \rangle
$$

As the prior equation is valid for all \( m \), it means that \( R_f \) is independent of the value of \( m \), so we can set \( R_f(\mathbf{x}, y) = \mathbf{x} \). Similarly, if we denote \( \Theta(\mathbf{x}) = \Theta_f(\mathbf{x}, 0) \), we obtain

$$
\Theta_f(\mathbf{q}, m) \cdot \Theta_f(\mathbf{k}, m)^\top = \Theta_g(\mathbf{q}, \mathbf{k}, 0) = \Theta_f(\mathbf{q}, 0) \cdot \Theta_f(\mathbf{k}, 0)^\top = \Theta(\mathbf{q}) \cdot \Theta(\mathbf{k})^\top
$$

which implies that \( \Theta_f(\mathbf{q}, m) \cdot \Theta(\mathbf{q})^\top = \Theta_f(\mathbf{k}, m) \cdot \Theta(\mathbf{k})^\top \) for all \( \mathbf{q}, \mathbf{k}, m \). This allows us to decompose \( \Theta_f \) as

$$
\Theta_f(\mathbf{x}, m) = \varphi(m) \cdot \Theta(\mathbf{x})
$$

Examining the case of \( m = n + 1 \) reveals that

$$
\varphi(m) \cdot \varphi(m-1)^\top = \Theta_g(\mathbf{q}, \mathbf{k}, 1) \cdot \Theta(\mathbf{k}) \cdot \Theta(\mathbf{q})^\top
$$

Since the right-hand side does not depend on \( m \), the left-hand side must not either, and so \( \varphi \) is a geometric progression of rotation matrices. Setting the initial values \( \varphi(0) = I \) (the identity matrix) and \( \varphi(1) = \Theta \), we have \( \varphi(m) = \Theta^m \), where \( \Theta \in \text{SO}(4)^{d/4} \) is a blockwise base rotation derived from the quaternion structure.

Putting all of these pieces together, we get the final formula for the quaternion rotary positional embedding:

$$
f(\mathbf{q}, m) = \Theta^m \cdot \Theta(\mathbf{q}) = \bigoplus_{j=1}^{d/4} R_4(m \cdot \theta_j \cdot q) \cdot q_j
$$

and likewise for \( \mathbf{k} \).

Since computers tend to like real numbers and matrices more than quaternions, it's convenient to convert this expression into the matrix equation

$$
f(\mathbf{q}, m) = 
\begin{pmatrix}
R_1(m \cdot \theta_1 \cdot q) & & & \\
& R_2(m \cdot \theta_2 \cdot q) & & \\
& & \ddots & \\
& & & R_{d/4}(m \cdot \theta_{d/4} \cdot q)
\end{pmatrix}
\begin{pmatrix}
q_1 \\
q_2 \\
\vdots \\
q_d
\end{pmatrix}
= \Theta_m \mathbf{Q}_m = \Theta_m \mathbf{W}_q \mathbf{X}_m
$$

where each \( R_j(m \cdot \theta_j \cdot q) \in \mathbb{R}^{4 \times 4} \) is a sin/cos-structured rotation matrix defined by the quaternion \( q \) scaled by position \( m \) and block frequency \( \theta_j \), \( \Theta_m \in \mathbb{R}^{d \times d} \) is the full block-diagonal rotation matrix, \( \mathbf{W}_q \) is the learned query projection, and \( \mathbf{X}_m \) is the token embedding at position \( m \). Again, we also have the corresponding equation for \( \mathbf{k} \).



V2

---

We begin with absolute positional information: for each token, we assume access to a real-valued 4D feature vector \([w, x, y, z]\), where \(w\) represents a temporal component and \(x, y, z\) represent spatial or structural features. We package this into a quaternion \( q = w + xi + yj + zk \) and treat it as an encoding of local position, scale, and orientation. 

However, dot products (and therefore attention mechanisms) do not preserve absolute positional information. Encoding positional data directly into the values of token embeddings risks losing it entirely after a single inner product. Dot products *do* preserve relative structure—so our goal is to encode absolute positional, orientational, and frequency-scaled information into token embeddings in a way that attention will interpret as *relative* and thus preserve.

In standard rotary embeddings, it's mathematically convenient to use complex numbers. Instead of working in \( \mathbb{R}^d \), one lifts the space to \( \mathbb{C}^{d/2} \) by grouping each pair of embedding dimensions into a single complex number. Here, we analogously work in \( \mathbb{H}^{d/4} \): grouping each block of four embedding dimensions into a quaternion. That is,

\[
\mathbf{q} = (q_1, q_2, \dots, q_d) \in \mathbb{R}^d \quad \longmapsto \quad \left( q_1 + q_2 i + q_3 j + q_4 k,\; q_5 + q_6 i + q_7 j + q_8 k, \;\dots \right) \in \mathbb{H}^{d/4}
\]

Let \(\mathbf{q}, \mathbf{k} \in \mathbb{H}^{d/4}\) be query and key embeddings respectively, and let \(m, n \in \mathbb{H}\) represent absolute structural positions of the corresponding tokens. We define a function \(f(\mathbf{x}, \ell)\) that takes a quaternionic embedding and applies a rotation based on the quaternionic position \(\ell\), such that:

\[
f(\mathbf{x}, \ell) = \bigoplus_{j=1}^{d/4} R_4(\ell \cdot \theta_j) \cdot x_j
\]

where \(x_j \in \mathbb{R}^4\) is the \(j\)-th real-valued block of the embedding, \(\theta_j\) is a learnable or fixed frequency for the \(j\)-th block, and \(R_4(\cdot)\) is a structured \(4 \times 4\) real-valued rotation matrix derived from the quaternion input.

This operation parallels RoPE: rather than rotating 2D complex pairs, we rotate 4D real blocks using quaternion-derived 4×4 matrices. Each \(R_4(\ell \cdot \theta_j)\) rotates a chunk of the embedding based on its block frequency and token structure.

To make the approach compatible with attention, we preserve the key property:

\[
\langle f(\mathbf{q}, m), f(\mathbf{k}, m) \rangle = \langle \mathbf{q}, \mathbf{k} \rangle
\]

That is, applying the same set of rotations to both the query and key embeddings preserves their inner product. This follows from each \(R_4\) being orthogonal (i.e., in \(\mathrm{SO}(4)\)).

For differing positions \(m\) and \(n\), we encode relative structure as:

\[
\langle f(\mathbf{q}, m), f(\mathbf{k}, n) \rangle = \langle \mathbf{q}, \Theta(m^{-1}n) \cdot \mathbf{k} \rangle
\]

where the relative quaternion \(m^{-1}n\) defines the transformation between tokens' structural positions, and \(\Theta(\cdot)\) denotes the block-diagonal matrix composed of the corresponding \(R_4\) rotations.

Putting everything together, we define:

\[
f(\mathbf{q}, m) = 
\begin{pmatrix}
R_1(m \cdot \theta_1) & & & \\
& R_2(m \cdot \theta_2) & & \\
& & \ddots & \\
& & & R_{d/4}(m \cdot \theta_{d/4})
\end{pmatrix}
\begin{pmatrix}
q_1 \\
q_2 \\
\vdots \\
q_d
\end{pmatrix}
= \Theta_m \cdot \mathbf{W}_q \cdot \mathbf{X}_m
\]

where:
- each \(R_j(m \cdot \theta_j) \in \mathbb{R}^{4 \times 4}\) is computed from a smooth trigonometric function of the quaternion’s components (analogous to RoPE's sinusoidal construction),
- \(\Theta_m \in \mathbb{R}^{d \times d}\) is the block-diagonal matrix of all rotations,
- \(\mathbf{W}_q\) is the query projection matrix,
- \(\mathbf{X}_m\) is the input embedding at token position \(m\).

This gives us a blockwise-rotated embedding where the relative structure between positions is preserved under dot product, the full quaternion structure of position is exploited, and scale/orientation are naturally handled via non-unit norm quaternions.


V3

---

We begin with absolute structural information: for each token, we know a 4D real-valued vector \( q = [w, x, y, z] \in \mathbb{R}^4 \) that encodes its local orientation, hierarchical depth, nesting context, or spatial/temporal embedding. Rather than treating this position as a scalar index, we lift it to a quaternion and use it to define structured, frequency-sensitive rotations over blocks of the embedding.

However, dot products (and therefore attention mechanisms) do not preserve absolute structural position. Encoding structural information directly into the values of token embeddings risks it being erased by the attention mechanism. Dot products *do*, however, preserve relative relationships. So we aim to inject position, orientation, and scale implicitly—via rotations—so that relative structure is preserved, and global structure is inferred from local geometric coherence.

Just as rotary embeddings use the complex numbers to define 2D rotations in \( \mathbb{C}^{d/2} \), we use quaternions to define 4D real rotations in \( \mathbb{H}^{d/4} \). Specifically, instead of viewing the embedding as a real vector \( \mathbf{x} \in \mathbb{R}^d \), or lifting it to \( \mathbb{C}^{d/2} \) by pairing consecutive entries, we lift it to \( \mathbb{H}^{d/4} \) by treating each consecutive group of four real-valued embedding components as a quaternion-valued subvector. That is,

\[
\mathbf{x} = (x_1, x_2, \ldots, x_d) \in \mathbb{R}^d
\quad \longmapsto \quad
(x^{(1)}, x^{(2)}, \ldots, x^{(d/4)}) \in \mathbb{H}^{d/4}
\]

where each \( x^{(j)} = x_{4j-3} + i x_{4j-2} + j x_{4j-1} + k x_{4j} \).

Let \( \theta_j \) be the angular frequency associated with the \(j\)-th quaternionic block. Let \( m \) be the token index in the sequence, and let \( q \in \mathbb{R}^4 \) be the structural quaternion for that token. Define a per-block “phase-scaled quaternion”:

\[
\tilde{q}_j = m \cdot \theta_j \cdot q
\]

Then define a real-valued \(4 \times 4\) rotation matrix \( R_4(\tilde{q}_j) \in \mathbb{R}^{4 \times 4} \), using a sin/cos structure analogous to the 2D RoPE matrix:

\[
R_4(\tilde{q}_j) =
\begin{bmatrix}
\cos(w_j) & -\sin(x_j) & -\sin(y_j) & -\sin(z_j) \\
\sin(x_j) & \cos(w_j)  & -\sin(z_j) &  \sin(y_j) \\
\sin(y_j) & \sin(z_j)  & \cos(w_j)  & -\sin(x_j) \\
\sin(z_j) & -\sin(y_j) & \sin(x_j)  & \cos(w_j)
\end{bmatrix}
\]

Each block rotation matrix \( R_j = R_4(m \cdot \theta_j \cdot q) \) acts on the corresponding 4D subvector \( x^{(j)} \) of the embedding. The full embedding transformation is then defined by a **block-diagonal matrix** \( \Theta_m(q) \in \mathbb{R}^{d \times d} \), structured as:

\[
\Theta_m(q) =
\begin{pmatrix}
R_1 & & & \\
& R_2 & & \\
& & \ddots & \\
& & & R_{d/4}
\end{pmatrix}
\]

This leads to the full Quaternion-RoPE embedding function:

\[
f(\mathbf{x}, m) = \Theta_m(q) \cdot \mathbf{x}
\]

Each block gets the same directional encoding \( q \), but is modulated by its own frequency \( \theta_j \), just as in RoPE. And because each \( R_j \in \mathrm{SO}(4) \), we recover the attention-preserving property:

\[
\langle f(\mathbf{q}, m), f(\mathbf{k}, m) \rangle = \langle \mathbf{q}, \mathbf{k} \rangle
\]

and for \( m \neq n \):

\[
\langle f(\mathbf{q}, m), f(\mathbf{k}, n) \rangle = g(\mathbf{q}, \mathbf{k}, m - n)
\]

Thus, we achieve a clean generalization of RoPE from 2D complex rotations to 4D quaternion-inspired rotations, enabling each block of the model’s embedding to rotate with respect to a structured, frequency-aware geometric kernel. This injects interpretable structure into the model’s representation space while preserving the core property that makes RoPE so effective: **relative rotation under dot product attention**.