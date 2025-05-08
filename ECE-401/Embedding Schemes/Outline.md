# RoPE

Rotary Positional Embedding (RoPE) is a type of position encoding that unifies absolute and relative approaches.
At its conception it matched or surpassed all available methods for injecting positional information into transformers.
RoPE was designed to provide a principled, easy to implement, and generally-applicable method for relative position encoding.

The dot product between two vectors is a function of the magnitude of individual vectors and the angle between them. This means that we can represent token embeddings as complex numbers and their positions as pure rotations that we apply to them. By shifting the query and key by the same amount, we will change their absolute, but not their relative, position, preserving both the angle between them, and their dot product. A simple exploitation of rotation's nature.






Recall the polar form of the Euclidean inner product  
$\langle \mathbf{q},\mathbf{k}\rangle = \|\mathbf{q}\|\,\|\mathbf{k}\| \cos\bigl(\theta_{\mathbf{qk}}\bigr)$,  
where $\theta_{\mathbf{qk}}$ is the angle between the vectors.

RoPE maps each even–odd pair of embedding coordinates to a complex scalar and encodes a token’s index $m$ as a unit-norm rotation $e^{i m \theta}$.  
Left–multiplying both $\mathbf{q}$ and $\mathbf{k}$ by the same rotation leaves $\theta_{\mathbf{qk}}$ unchanged, so any global index shift produces identical attention logits.  
Hence absolute positions are discarded while relative displacements are exactly preserved, yielding translation-equivariant self-attention.





1. Attention logits are dot-products ⟨q,k⟩ in ℝᵈ.
2. We want them to depend on relative position (m–n) only, not absolute m,n.
3. 