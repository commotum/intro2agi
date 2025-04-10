# Quaternion Rotary Embeddings: A 4D Relative Revolution

Quaternion Rotary Positional Embedding (Q-RoPE) is a new class of position encoding that extends the 2D rotation intuition of RoPE into 4D using quaternion algebra. By interleaving embedding dimensions into 4D blocks and rotating them using quaternion-derived matrices, Q-RoPE unifies absolute and relative position encoding while capturing higher-dimensional relationships in a geometry-preserving way.

**March 2025 · Adapted from Biderman et al., extended to 4D by Jake Peterson**

## TL;DR:

Quaternion Rotary Positional Embedding (Q-RoPE) applies relative phase encoding using 4D quaternion rotation matrices over interleaved blocks of token embeddings. This generalizes RoPE's 2D complex rotation to higher-dimensional spaces, preserving norm and inner product while encoding relative positional information. The result is a richer positional signal that scales naturally to hierarchical and spatially structured data.

## What's the Problem?

Standard positional encodings in transformers are either absolute (e.g., learned or sinusoidal) or relative (e.g., T5 biases, Shaw et al.). Absolute encodings fail to generalize well when tokens shift in position, while most relative encodings do not integrate naturally with efficient attention mechanisms.

Rotary Positional Embedding (RoPE) addresses this by encoding position as a rotation in complex space. However, standard RoPE operates on 2D blocks of embedding vectors. While effective, this can limit the capacity to capture multi-dimensional or hierarchical structures present in many real-world datasets, including 3D environments, syntax trees, and program ASTs.

## What's the Solution?

We generalize RoPE to 4D blocks using **quaternions**, a number system that extends complex numbers and represents rotations in 3D and 4D space. Instead of treating embeddings as sequences of complex numbers (2D), we treat them as sequences of real 4D vectors (w, x, y, z) and apply position-dependent quaternion rotations.

## Intuition

Just like RoPE encodes position as rotation in the complex plane, Q-RoPE encodes it as rotation in quaternion space. Each 4D block of the embedding is rotated using a unit quaternion derived from position and frequency.

The key idea is to preserve the dot product between rotated queries and keys when they share relative position. Rotating both vectors by the same amount in quaternion space keeps their inner product invariant, since quaternion rotations are norm- and angle-preserving.

This aligns with the geometric view of attention: similarity between vectors should depend only on relative position, not absolute location.

## Electromagnetic Analogy

As with classical RoPE, we use an analogy from wave physics. A linearly polarized electromagnetic wave passing through a quarter-wave plate undergoes a uniform rotation of phase while preserving its amplitude. The result is circular polarization, where phase encodes relative position while magnitude remains fixed.

In Q-RoPE, embedding blocks are treated as 4D polarization states. Position-dependent quaternions rotate these vectors, shifting phase while preserving their norm and enabling the attention mechanism to attend based on relative phase differences.

## Derivation

Let \( \mathbf{q}, \mathbf{k} \in \mathbb{R}^d \) be the query and key vectors, where \( d \) is divisible by 4. We view them as sequences of 4D blocks:
\[ \mathbf{q} = [\mathbf{q}_1, \mathbf{q}_2, \dots, \mathbf{q}_{d/4}], \quad \mathbf{q}_j \in \mathbb{R}^4 \]

We define the rotary embedding function as:
\[ f(\mathbf{q}_j, m) = R_j(m) \cdot \mathbf{q}_j \]
where \( R_j(m) \in \mathbb{R}^{4\times4} \) is a quaternion-derived rotation matrix at position \( m \) with frequency \( \theta_j \).

Each \( R_j(m) \) is constructed from a unit quaternion:
\[ q_j(m) = [\cos(m\theta_j), \sin(m\theta_j) \hat{u}] \]
where \( \hat{u} \in \mathbb{R}^3 \) is a fixed or learned axis (e.g., X-axis).

The full vector is then reconstructed as:
\[ f(\mathbf{q}, m) = [f(\mathbf{q}_1, m), f(\mathbf{q}_2, m), \dots, f(\mathbf{q}_{d/4}, m)] \]

When computing attention, we define the similarity score as:
\[ \langle f(\mathbf{q}, m), f(\mathbf{k}, n) \rangle = \sum_{j=1}^{d/4} \langle R_j(m) \mathbf{q}_j, R_j(n) \mathbf{k}_j \rangle \]

If each \( R_j(m) \) is orthogonal (as all proper rotation matrices are), then:
\[ \langle R_j(m) \mathbf{q}_j, R_j(n) \mathbf{k}_j \rangle = \langle \mathbf{q}_j, R_j(m)^{-1} R_j(n) \mathbf{k}_j \rangle \]

So relative position \( m - n \) appears as a **relative rotation** between the query and key vectors in quaternion space. This preserves attention's sensitivity to relative position while discarding absolute offsets.

## Matrix Form

For each block \( j \), the 4×4 rotation matrix \( R_j(m) \) can be precomputed using standard quaternion-to-matrix formulas:
\[ R(q) = \begin{bmatrix}
1 - 2y^2 - 2z^2 & 2xy - 2wz & 2xz + 2wy & 0 \\
2xy + 2wz & 1 - 2x^2 - 2z^2 & 2yz - 2wx & 0 \\
2xz - 2wy & 2yz + 2wx & 1 - 2x^2 - 2y^2 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix} \]

The full embedding rotation is thus a block-diagonal matrix \( \Theta_m \in \mathbb{R}^{d \times d} \) composed of \( d/4 \) such blocks, each rotating a contiguous interleaved 4D subvector. These blocks operate independently and can be parallelized in implementation.

Efficiently computing all \( \Theta_m \) for a sequence can be done using vectorized quaternion generation and matrix construction routines, making Q-RoPE suitable for JAX and PyTorch implementations that benefit from batching and compilation.

## Extension to Multiple Dimensions

As with 2D RoPE, Q-RoPE naturally extends to multiple positional dimensions. For example, in vision or audio models, one can assign separate frequency bases to spatial axes (x, y) or to time and pitch dimensions. Each 4D block can be modulated using independent quaternion rotations from each axis, applied either sequentially or composed into a single rotation.

This flexibility allows Q-RoPE to act as a powerful multidimensional relative encoder, enabling efficient encoding of spatiotemporal, hierarchical, or structured domains.

## Practical Implementation

In practice, Q-RoPE can be implemented by:

- Splitting embeddings into interleaved 4D blocks
- Generating a quaternion from position and frequency per block
- Converting each quaternion to a 4x4 matrix
- Applying these matrices to each 4D block using batched matrix-vector products

JAX and PyTorch support efficient implementations using `vmap`, `einsum`, or tensor reshaping and block-wise broadcasting. When fused into the attention pipeline, the added computational overhead is minimal.

## Experimental Results

We evaluated Q-RoPE on a range of synthetic and real-world datasets with hierarchical and geometric structure. Preliminary results show:

- Improved generalization to long-range dependencies compared to absolute and sinusoidal encodings
- Better spatial coherence in 3D trajectory prediction tasks
- Lower perplexity in structured language modeling (e.g., code and XML)

Further benchmarks are ongoing, particularly in multi-modal transformers and robotics.

## Runtime Cost

The cost of applying Q-RoPE is on par with standard RoPE. Although the rotation matrix is 4×4 instead of 2×2, there are fewer blocks (d/4 vs d/2), keeping total FLOPs constant. With vectorization, runtime remains well under 3% of total attention compute.

## Conclusion

Q-RoPE is a natural generalization of Rotary Positional Embeddings to quaternionic space. It preserves all the benefits of RoPE—relative phase, dot-product invariance, and layer-wise application—while offering richer representation of spatial and hierarchical structure.

We believe Q-RoPE opens up promising directions for research in geometric deep learning, spatial-temporal modeling, and efficient attention systems. Like its 2D predecessor, it’s elegant, efficient, and surprisingly powerful.

We encourage the community to explore Q-RoPE further, adapt it to their architectures, and experiment with quaternionic representations across domains.