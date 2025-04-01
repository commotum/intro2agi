# 4 BiQUE: Biquaternionic Embeddings

## 4.1 Unification of Circular and Hyperbolic Rotations

We prove that a biquaternion unifies both circular and hyperbolic rotations in $\mathbb{C}^4$ space within a single representation in **Theorem 4.1** (the proof is in Appendix A).

---

**Theorem 4.1.**  
Let $\mathcal{M}(q)$ be the matrix representation of a unit biquaternion  
$$
q = q_r + q_i \mathbf{I},
$$  
where  
$$
q_r = w_r + x_r \mathbf{i} + y_r \mathbf{j} + z_r \mathbf{k}, 
\quad
q_i = w_i + x_i \mathbf{i} + y_i \mathbf{j} + z_i \mathbf{k}.
$$  
$\mathcal{M}(q)$ can be factorized as  
$$
\mathcal{M}(q) = \mathcal{M}(h) \, \mathcal{M}(u),
$$  
where
$$
\mathcal{M}(h)=
\begin{bmatrix}
\cosh \phi 
 & -\,a\, \mathbf{I}\,\sinh \phi 
 & -\,b\, \mathbf{I}\,\sinh \phi 
 & -\,c\, \mathbf{I}\,\sinh \phi\\
a\, \mathbf{I}\,\sinh \phi 
 & \cosh \phi 
 & c\, \mathbf{I}\,\sinh \phi 
 & -\,b\, \mathbf{I}\,\sinh \phi\\
b\, \mathbf{I}\,\sinh \phi 
 & -\,c\, \mathbf{I}\,\sinh \phi 
 & \cosh \phi 
 & a\, \mathbf{I}\,\sinh \phi\\
c\, \mathbf{I}\,\sinh \phi 
 & b\, \mathbf{I}\,\sinh \phi 
 & -\,a\, \mathbf{I}\,\sinh \phi 
 & \cosh \phi
\end{bmatrix},
$$
$$
\mathcal{M}(u) = 
\begin{bmatrix}
\cos \theta 
 & -\,\dfrac{x_r \sin \theta}{\|v(q_r)\|} 
 & -\,\dfrac{y_r \sin \theta}{\|v(q_r)\|} 
 & -\,\dfrac{z_r \sin \theta}{\|v(q_r)\|}\\[1em]
\dfrac{x_r \sin \theta}{\|v(q_r)\|}
 & \cos \theta 
 & \dfrac{z_r \sin \theta}{\|v(q_r)\|} 
 & -\,\dfrac{y_r \sin \theta}{\|v(q_r)\|}\\[1em]
\dfrac{y_r \sin \theta}{\|v(q_r)\|}
 & -\,\dfrac{z_r \sin \theta}{\|v(q_r)\|} 
 & \cos \theta 
 & \dfrac{x_r \sin \theta}{\|v(q_r)\|}\\[1em]
\dfrac{z_r \sin \theta}{\|v(q_r)\|}
 & \dfrac{y_r \sin \theta}{\|v(q_r)\|} 
 & -\,\dfrac{x_r \sin \theta}{\|v(q_r)\|} 
 & \cos \theta
\end{bmatrix},
$$
$$
\theta = \cos^{-1} \biggl(\frac{w_r}{\|q_r\|}\biggr), 
\quad
\phi = \cosh^{-1}\bigl\|q_r\bigr\|,
\quad
\frac{\overline{q}_r\, q_i}{\|q_r\|\|q_i\|} = a\,\mathbf{i} + b\,\mathbf{j} + c\,\mathbf{k},
\quad
\theta,\phi,a,b,c \in \mathbb{R}.
$$
Alternatively,  
$$
\mathcal{M}(q)=\mathcal{M}(u)\,\mathcal{M}\bigl(h^{\prime}\bigr),
$$  
where  
$$
\frac{q_i \,\overline{q}_r}{\|q_i\|\|q_r\|}=a^{\prime}\,\mathbf{i} + b^{\prime}\,\mathbf{j} + c^{\prime}\,\mathbf{k},
\quad
\mathcal{M}\bigl(h^{\prime}\bigr)=
\begin{bmatrix}
\cosh \phi 
 & -\,a^{\prime} \mathbf{I}\,\sinh \phi 
 & -\,b^{\prime} \mathbf{I}\,\sinh \phi 
 & -\,c^{\prime} \mathbf{I}\,\sinh \phi\\
a^{\prime} \mathbf{I}\,\sinh \phi 
 & \cosh \phi 
 & c^{\prime} \mathbf{I}\,\sinh \phi 
 & -\,b^{\prime} \mathbf{I}\,\sinh \phi\\
b^{\prime} \mathbf{I}\,\sinh \phi 
 & -\,c^{\prime} \mathbf{I}\,\sinh \phi 
 & \cosh \phi 
 & a^{\prime} \mathbf{I}\,\sinh \phi\\
c^{\prime} \mathbf{I}\,\sinh \phi 
 & b^{\prime} \mathbf{I}\,\sinh \phi 
 & -\,a^{\prime} \mathbf{I}\,\sinh \phi 
 & \cosh \phi
\end{bmatrix}.
$$

In addition, the determinants of $\mathcal{M}(h)$, $\mathcal{M}\bigl(h^{\prime}\bigr)$, and $\mathcal{M}(u)$ are all 1, and $\mathcal{M}(h)$, $\mathcal{M}\bigl(h^{\prime}\bigr)$, and $\mathcal{M}(u)$ are orthogonal.

From **Theorem 4.1**, we know that the matrix $\mathcal{M}(q)$, representing a unit biquaternion $q$, can be expressed as the composition of two matrices $\mathcal{M}(h)$ and $\mathcal{M}(u)$ (or $\mathcal{M}(u)$ and $\mathcal{M}\bigl(h^{\prime}\bigr)$). Further, since all elements in $\mathcal{M}(h)$, $\mathcal{M}\bigl(h^{\prime}\bigr)$, and $\mathcal{M}(u)$ are derived from $q$, we can construct $\mathcal{M}(h)$, $\mathcal{M}\bigl(h^{\prime}\bigr)$, and $\mathcal{M}(u)$ given $q$.

An orthogonal matrix with determinant 1 represents a rotation in the space in which it operates (Artin, 1957). Since we know both $\mathcal{M}(h)$ and $\mathcal{M}(u)$ are orthogonal and have determinants 1 from **Theorem 4.1**, they each represent a rotation in $\mathbb{C}^4$ space. From the form of the matrices, we can see that $\mathcal{M}(u)$ represents a circular rotation, while $\mathcal{M}(h)$ represents a hyperbolic rotation${}^1$. To see the hyperbolic-rotation nature of $\mathcal{M}(h)$ more clearly, we can use the identities $\cosh \phi = \cos (\mathbf{I}\,\phi)$ and $\mathbf{I}\,\sinh \phi = \sin (\mathbf{I}\,\phi)$ to represent $\mathcal{M}(h)$ as
$$
\begin{bmatrix}
\cos (\mathbf{I}\,\phi) 
 & -\,a\, \sin (\mathbf{I}\,\phi) 
 & -\,b\, \sin (\mathbf{I}\,\phi) 
 & -\,c\, \sin (\mathbf{I}\,\phi)\\
a\, \sin (\mathbf{I}\,\phi) 
 & \cos (\mathbf{I}\,\phi) 
 & c\, \sin (\mathbf{I}\,\phi) 
 & -\,b\, \sin (\mathbf{I}\,\phi)\\
b\, \sin (\mathbf{I}\,\phi) 
 & -\,c\, \sin (\mathbf{I}\,\phi) 
 & \cos (\mathbf{I}\,\phi) 
 & a\, \sin (\mathbf{I}\,\phi)\\
c\, \sin (\mathbf{I}\,\phi) 
 & b\, \sin (\mathbf{I}\,\phi) 
 & -\,a\, \sin (\mathbf{I}\,\phi) 
 & \cos (\mathbf{I}\,\phi)
\end{bmatrix}.
$$

${}^1$ This may be clearer by restricting each matrix to the first two dimensions, which correspond to the square sub-matrix made up of the 4 elements at the top-left corner.

Now $\mathcal{M}(h)$ takes the form of a “regular” rotation matrix (cf. $\mathcal{M}(u)$), but with a complex angle $\mathbf{I}\,\phi$. According to Lansey (2009), a rotation through an imaginary angle $\mathbf{I}\,\phi$ can be understood as a hyperbolic rotation through the real angle $\phi$. Consequently, a unit biquaternion composes these two kinds of rotations in a coherent algebraic representation. (It has been shown by Jafari (2016, Corollary 4.1) that $\mathcal{M}(q)$ is orthogonal with a determinant of 1, and thus represents an arbitrary rotation in $\mathbb{C}^4$. However, that paper does not tease apart the matrix to reveal the contributions of its component circular and hyperbolic rotation matrices like we have done.)

Our results extend to arbitrary (not necessarily unit) biquaternions. Any biquaternion $q$ is a scaled version of its unit biquaternion, i.e.,  
$$
q = \|q\|\Bigl(\tfrac{q}{\|q\|}\Bigr).
$$
Thus its matrix $\mathcal{M}(q)$ represents a circular rotation followed by a hyperbolic rotation (i.e., $\mathcal{M}(h)\,\mathcal{M}(u)$), or a hyperbolic rotation followed by a circular rotation (i.e., $\mathcal{M}(u)\,\mathcal{M}\bigl(h^{\prime}\bigr)$). Both rotations are represented by $\tfrac{q}{\|q\|}$, followed by a scaling by $\|q\|$.

We analyze and visualize the $M(u)$ and $M(h)$ rotations in **Appendix B**.

It is worth noting that the system QuatE${}^2$ (Zhang et al., 2019), an experimental baseline in Section 5, uses quaternions as its representation. Because quaternions are special cases of biquaternions, QuatE${}^2$ only employs the circular rotation matrix $M(u)$ (with its $M(h)$ as the identity matrix). Further, note that the power of a biquaternion does not merely come from doubling the parameters of a quaternion. A biquaternion achieves better representational power and parameter efficiency by facilitating the interactions between its real and imaginary parameters (see the last paragraph of Section B of the Appendix, and subsection 5.5.3).

---

## B Analysis and Visualization of BiQUE’s Circular and Hyperbolic Rotations

To analyze BiQUE’s circular and hyperbolic rotations, we restrict ourselves to two dimensions. This means a biquaternion takes the form  
$$
q = w + x\,\mathbf{i},
$$
where $w, x \in \mathbb{C}$. The unit quaternion $q_r$ in **Theorem 4.1** is thus  
$$
q_r = w_r + x_r\,\mathbf{i},
$$
where $w_r, x_r \in \mathbb{R}$, and  
$$
\frac{x_r}{\|v(q_r)\|} = \frac{x_r}{\|\,x_r\,\mathbf{i}\|} = 1.
$$
The circular rotation matrix is thus
$$
M(u) =
\begin{bmatrix}
\cos \theta & -\,\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}.
$$

Now, we multiply $M(u)$ by an arbitrary biquaternion $(w_r + w_i\,\mathbf{I}) + (x_r + x_i\,\mathbf{I})\,\mathbf{i}$ to transform it:

$$
\begin{bmatrix}
\cos \theta & -\,\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}
\begin{bmatrix}
w_r + w_i\,\mathbf{I} \\
x_r + x_i\,\mathbf{I}
\end{bmatrix}
=
\begin{bmatrix}
\cos \theta & -\,\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}
\begin{bmatrix}
w_r\\
x_r
\end{bmatrix}
+
\mathbf{I}\,
\begin{bmatrix}
\cos \theta & -\,\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}
\begin{bmatrix}
w_i\\
x_i
\end{bmatrix}.
$$

We can see that the real parts $w_r, x_r$ and imaginary parts $w_i, x_i$ are transformed independently. Hence we can accomplish the same effect by rotating two quaternions $(w_r + x_r\,\mathbf{i})$ and $(w_i + x_i\,\mathbf{i})$ independently, and this does not imbue biquaternions with added representational power beyond that of quaternions, which also have the rotation $M(u)$ matrix.

Now, we examine the effect of the hyperbolic rotation matrix $M(h)$. Since $a\,\mathbf{i} + b\,\mathbf{j} + c\,\mathbf{k}$ is a unit quaternion (as shown in the proof of **Theorem 4.1**), and we restrict ourselves to two dimensions, it must be that $a=1$, $b=0$, $c=0$. The hyperbolic rotation matrix is thus
$$
M(h)=
\begin{bmatrix}
\cosh \phi & -\,\mathbf{I}\,\sinh \phi \\
\mathbf{I}\,\sinh \phi & \cosh \phi
\end{bmatrix}.
$$

We multiply $M(h)$ by an arbitrary biquaternion $(w_r + w_i\,\mathbf{I}) + (x_r + x_i\,\mathbf{I})\,\mathbf{i}$ to transform the latter:

$$
\begin{bmatrix}
\cosh \phi & -\,\mathbf{I}\,\sinh \phi \\
\mathbf{I}\,\sinh \phi & \cosh \phi
\end{bmatrix}
\begin{bmatrix}
w_r + w_i\,\mathbf{I}\\
x_r + x_i\,\mathbf{I}
\end{bmatrix}
=
\begin{bmatrix}
w_r & x_i\\
x_r & -\,w_i
\end{bmatrix}
\begin{bmatrix}
\cosh \phi\\
\sinh \phi
\end{bmatrix}
+
\mathbf{I}\,
\begin{bmatrix}
w_i & -\,x_r\\
x_i & w_r
\end{bmatrix}
\begin{bmatrix}
\cosh \phi\\
\sinh \phi
\end{bmatrix}.
$$

Observe each term in the sum now involves both the real and imaginary parts ($w_r, x_r, w_i, x_i$) of the input biquaternion. This is unlike the case above for $M(u)$, in which the real and imaginary components are independent. Thus it is the hyperbolic rotation $M(h)$ that allows for the interaction between the real and imaginary components. To illustrate the hyperbolic rotation, we set $w_r=1, w_i=2, x_r=3, x_i=4$, and change the value of $\phi$ continually from an initial value of 0. Note that when $\phi=0$, the first term in the sum is the point $(w_r, x_r)$ and the second term is $(w_i, x_i)$. As $\phi$ changes, we can visualize the projection of that point. In Figure 3, the initial points in red are projected along the green lines. Clearly the green paths are hyperbolic. The blue point is an example of a projected point.

---

## C Normalization of Biquaternions

Given that
$$
Q_r^{\times} = 
(w_r + w_i \,\mathbf{I}) 
+ (x_r + x_i\,\mathbf{I})\,\mathbf{i}
+ (y_r + y_i\,\mathbf{I})\,\mathbf{j}
+ (z_r + z_i\,\mathbf{I})\,\mathbf{k},
$$
let 
$$
A = (w_r^2 + x_r^2 + y_r^2 + z_r^2), 
\quad
B = (w_i^2 + x_i^2 + y_i^2 + z_i^2).
$$
We define the real vector norm $\|Q_r^{\times}\|_v$ and biquaternion norm $\|Q_r^{\times}\|_b$ as follows:

$$
\|Q_r^{\times}\|_v^2 = A + B,
\qquad
\|Q_r^{\times}\|_b^2 = A - B 
+ 2\,(w_r\,w_i + x_r\,x_i + y_r\,y_i + z_r\,z_i)\,\mathbf{I}.
$$

Thus, we can obtain $Q_r^{\times \star}$ in section 5.5.2 with the standard normalization of real vectors:

$$
Q_r^{\times \star} = \frac{Q_r^{\times}}{\|Q_r^{\times}\|_v}.
$$

To make $Q_r^{\times}$ be a unit biquaternion, we have to ensure that $A - B = 1$ and $w_r\,w_i + x_r\,x_i + y_r\,y_i + z_r\,z_i = 0$. We first employ the Gram–Schmidt orthogonalization technique to guarantee that the imaginary coefficient is zero and then restrict $B=1$. Alternatively, we represent $Q_r^{\times}$ as $Q_r^{\times} = q_1 + q_2\,\mathbf{I}$, and conduct the following operations:

$$
q_1' = q_1 - \frac{\langle q_1, q_2\rangle}{\|q_2\|^2}\, q_2,
\quad
\widetilde{q_1} = \frac{\sqrt{2}\,q_1'}{\|q_1'\|},
\quad
\widetilde{q_2} = \frac{q_2}{\|q_2\|}.
$$

Thus, we obtain the unit biquaternion
$$
Q_r^{\times \triangleleft} 
= \widetilde{q_1} + \widetilde{q_2}\,\mathbf{I}.
$$

