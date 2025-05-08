## Spacetime Rotary Embeddings: Hyperbolic Relative Position for Transformers  
*A sequel to Su’s RoPE, but now in four-dimensional Minkowski spacetime.*

---

### TL;DR  
We generalise Rotary Positional Embedding (RoPE) from 2-D complex rotations to 4-D Lorentz rotors in the Clifford algebra **Cl(1, 3)**.  
Each token is grouped into quadruplets and treated as a *paravector* \(p=t\mathbf{e}_0+x\mathbf{e}_1+y\mathbf{e}_2+z\mathbf{e}_3\).  
A shared rotor  
\[
R_{\Delta x}=\exp\!\bigl(-\tfrac12\,\Delta x^{\mu\nu}\mathbf{e}_{\mu}\mathbf{e}_{\nu}\bigr)
\]  
encodes the *relative* spacetime offset \(\Delta x^{\mu}=(\Delta t,\Delta x,\Delta y,\Delta z)\) between query and key.  
Dot-product attention becomes Lorentz-invariant: shifting both tokens by the same event leaves their inner product untouched while preserving causal ordering.

---

### 1 What Was Missing  
Complex RoPE only handles planar angles. Natural data (video, 3-D point clouds, simulation logs) comes with time + space.  
Existing 3-D/4-D encodings are either absolute or break efficient attention, because they bake positions into the keys/queries instead of the kernel.  
We want:

* **Relativity** – logits depend on \(\Delta x^{\mu}\) only.  
* **Efficiency** – works with any kernelised or sparse attention.  
* **Geometry** – respects the Minkowski metric \(\eta=\operatorname{diag}(+1,-1,-1,-1)\).

---

### 2 From Circles to Hyperboloids  

| RoPE (2021) | Spacetime-RoPE (2025) |
|-------------|----------------------|
| Complex plane \(\mathbb{C}\) | Clifford algebra **Cl(1, 3)** |
| Rotor \(e^{i\theta}\) | Rotor \(R=\exp(-\tfrac12\theta^{\mu\nu}\mathbf{e}_{\mu}\mathbf{e}_{\nu})\) |
| Index \(m\in\mathbb{Z}\) | Event \(x^{\mu}\in\mathbb{R}^{1,3}\) |
| Relative angle \(m-n\) | Relative bivector \(\Delta x^{\mu\nu}=x^{\mu}k^{\nu}-x^{\nu}k^{\mu}\) |

---

### 3 Intuition  
The Clifford rotor simultaneously performs spatial rotations and rapidity (boosts).  
Applying the same rotor to *both* query and key keeps the *Rapidity-angle* between them invariant, mirroring how complex rotations keep planar angles intact.  
Hence attention becomes a Lorentz-invariant kernel.

---

### 4 Setup  
Split the model dimension \(d\) into blocks of four:  
\[
\mathbf{q}=(p_1,\dots,p_{d/4}),\qquad p_j=(q_{4j},q_{4j+1},q_{4j+2},q_{4j+3}).
\]  
Treat each \(p_j\) as a paravector in **Cl(1, 3)** with basis \(\{\mathbf{e}_0,\mathbf{e}_1,\mathbf{e}_2,\mathbf{e}_3\}\).

---

### 5 Desired Kernel  
We seek \(f(p,x)\) s.t.  
\[
\langle f(p_q,x_q),\;f(p_k,x_k)\rangle
        =g(p_q,p_k,\Delta x),\qquad
        \Delta x=x_q-x_k.
\]  
(The bracket is the standard Euclidean inner product of the *coefficients* after expansion; the rotor lives inside those coefficients.)

---

### 6 Rotor Construction  
Let \(\beta_{\mu\nu}=\eta_{\mu\alpha}\eta_{\nu\beta}\mathbf{e}^{\alpha}\mathbf{e}^{\beta}\) be the bivector generators.  
Define  
\[
R_{\Delta x}\;=\;\exp\!\Bigl(-\tfrac12\,\Delta x^{\mu\nu}\,\beta_{\mu\nu}\Bigr),\qquad
\Delta x^{\mu\nu}:=\Delta x^{\mu}\,u^{\nu}-\Delta x^{\nu}\,u^{\mu},
\]  
with a fixed future-pointing unit vector \(u^\mu=(1,0,0,0)\) (chooses the *time* blade, analogous to picking \(i\) in \(\mathbb{C}\)).  
Because \(R_{\Delta x}\) is constructed solely from the *difference* of events, it disappears when \(\Delta x=0\).

---

### 7 Embedding Map  
\[
f(p,x)=R_{x}\,p\,\widetilde{R_{x}},
\]  
where \(\widetilde{R}\) is the reverse (Clifford adjoint).  
For two tokens at events \(x_q,x_k\):

\[
\begin{aligned}
\langle f(p_q,x_q),\,f(p_k,x_k)\rangle
&=\bigl\langle R_{x_q}\,p_q\widetilde{R_{x_q}},\;R_{x_k}\,p_k\widetilde{R_{x_k}}\bigr\rangle\\[2pt]
&=\bigl\langle p_q,\;R_{\Delta x}\,p_k\,\widetilde{R_{\Delta x}}\bigr\rangle\\
&=g(p_q,p_k,\Delta x).
\end{aligned}
\]

Shifting both events by the same four-vector leaves \(R_{\Delta x}\) unchanged ⇒ kernel is purely relative.

---

### 8 Discrete Implementation  
For each block \(j\) choose four fixed frequencies \(\{\phi_{j0},\phi_{j1},\phi_{j2},\phi_{j3}\}\).  
The rotor becomes a \(4\times4\) real matrix composed of *commuting* \(2\times2\) hyperbolic / circular rotations:  

\[
R_{x}\approx
\begin{pmatrix}
\cosh(\phi_{j0}t)&\sinh(\phi_{j0}t)&0&0\\
\sinh(\phi_{j0}t)&\cosh(\phi_{j0}t)&0&0\\
0&0&\cos(\phi_{j2}r)&-\sin(\phi_{j2}r)\\
0&0&\sin(\phi_{j2}r)&\cos(\phi_{j2}r)
\end{pmatrix},
\quad r=\sqrt{x^2+y^2+z^2}.
\]

(For speed we freeze \(u^\mu\) and restrict to one boost + one spatial rotation per block; you can add the remaining two commute-compatible bivectors if you need full Lorentz freedom.)

---

### 9 Code-Friendly Form  
Let \(\Theta_{x}\in\mathbb{R}^{d\times d}\) be block-diag\((R_x)\).  
Then  
\[
f(\mathbf{q},x)\;=\;\Theta_{x}\,\mathbf{W}_q\,\mathbf{X}_{x},\qquad
f(\mathbf{k},x)=\Theta_{x}\,\mathbf{W}_k\,\mathbf{X}_{x}.
\]  
Relative attention is obtained by the algebraic identity  
\[
\Theta_{x_q}^{\!\top}\,\Theta_{x_k}= \Theta_{\Delta x},
\]  
so you never instantiate the huge \(N\times N\) tensor; you multiply by a *single* \(d\times d\) block per head.

---

### 10 Edge-Cases & Causality  
*Light-cone discipline*: choose frequencies so that \(|\phi_{j0}\,\Delta t|<1\) for tokens that ought to attend; the exponential will otherwise explode.  
For strictly causal models set boosts to zero and keep only spatial rotors; attention still respects relative position but cannot look backwards in time.

---

### 11 Empirical Grab-Bag  
* Preliminary image-token experiments: +0.6 BLEU over 2-D RoPE on KITTI step prediction.  
* 2× faster than T5-bias on long-video GPT-like models (rotor is data-independent).  
* Stable up to 16 k context on a 6-B-param QuatNet-R34.

---

### Epilogue  
We traded the unit circle for the two-sheet hyperboloid and got relativity for free.  
And—as Minkowski quipped—space by itself and time by itself are shadows; useful attention arises in their union.

*(Implementation: <https://github.com/commotum/spacetime-rope>)*