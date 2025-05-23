# Introduction

Learning representations of symbolic data such as text, graphs and
multi-relational data has become a central paradigm in machine learning
and artificial intelligence. For instance, word embeddings such as
<span class="smallcaps">word2vec</span> ,
<span class="smallcaps">GloVe</span> and
<span class="smallcaps">FastText</span> are widely used for tasks
ranging from machine translation to sentiment analysis. Similarly,
embeddings of graphs such as latent space embeddings ,
<span class="smallcaps">node2vec</span> , and
<span class="smallcaps">DeepWalk</span> have found important
applications for community detection and link prediction in social
networks. Embeddings of multi-relational data such as
<span class="smallcaps">Rescal</span> ,
<span class="smallcaps">TransE</span> , and Universal Schema are being
used for knowledge graph completion and information extraction.

Typically, the objective of embedding methods is to organize symbolic
objects (e.g., words, entities, concepts) in a way such that their
similarity in the embedding space reflects their semantic or functional
similarity. For this purpose, the similarity of objects is usually
measured either by their distance or by their inner product in the
embedding space. For instance, embed words in $`\mathbb{R}^d`$ such that
their inner product is maximized when words co-occur within similar
contexts in text corpora. This is motivated by the distributional
hypothesis , i.e., that the meaning of words can be derived from the
contexts in which they appear. Similarly, embed social networks such
that the distance between social actors is minimized if they are
connected in the network. This reflects the homophily property found in
many real-world networks, i.e. that similar actors tend to associate
with each other.

Although embedding methods have proven successful in numerous
applications, they suffer from a fundamental limitation: their ability
to model complex patterns is inherently bounded by the dimensionality of
the embedding space. For instance, showed that linear embeddings of
graphs can require a prohibitively large dimensionality to model certain
types of relations. Although non-linear embeddings can mitigate this
problem , complex graph patterns can still require a computationally
infeasible embedding dimensionality. As a consequence, no method yet
exists that is able to compute embeddings of large graph-structured data
– such as social networks, knowledge graphs or taxonomies – without loss
of information. Since the ability to express information is a
precondition for learning and generalization, it is therefore important
to increase the representation capacity of embedding methods such that
they can realistically be used to model complex patterns on a large
scale. In this work, we focus on mitigating this problem for a certain
class of symbolic data, i.e., large datasets whose objects can be
organized according to a latent hierarchy – a property that is inherent
in many complex datasets. For instance, the existence of power-law
distributions in datasets can often be traced back to hierarchical
structures . Prominent examples of power-law distributed data include
natural language (Zipf’s law ) and scale-free networks such as social
and semantic networks . Similarly, the empirical analysis of indicated
that many real-world networks exhibit an underlying tree-like structure.

To exploit this structural property for learning more efficient
representations, we propose to compute embeddings not in Euclidean but
in hyperbolic space, i.e., space with constant negative curvature.
Informally, hyperbolic space can be thought of as a continuous version
of trees and as such it is naturally equipped to model hierarchical
structures. For instance, it has been shown that any finite tree can be
embedded into a finite hyperbolic space such that distances are
preserved approximately . We base our approach on a particular model of
hyperbolic space, i.e., the Poincaré ball model, as it is well-suited
for gradient-based optimization. This allows us to develop an efficient
algorithm for computing the embeddings based on Riemannian optimization,
which is easily parallelizable and scales to large datasets.
Experimentally, we show that our approach can provide high quality
embeddings of large taxonomies – both with and without missing data.
Moreover, we show that embeddings trained on
<span class="smallcaps">WordNet</span> provide state-of-the-art
performance for lexical entailment. On collaboration networks, we also
show that Poincaré embeddings are successful in predicting links in
graphs where they outperform Euclidean embeddings, especially in low
dimensions.

The remainder of this paper is organized as follows: In
<a href="#sec:hyperbolic" data-reference-type="ref+Label"
data-reference="sec:hyperbolic">2</a> we briefly review hyperbolic
geometry and discuss related work regarding hyperbolic embeddings. In
<a href="#sec:poincare" data-reference-type="ref+Label"
data-reference="sec:poincare">3</a> we introduce Poincaré embeddings and
discuss how to compute them. In
<a href="#sec:experiments" data-reference-type="ref+Label"
data-reference="sec:experiments">4</a> we evaluate our approach on tasks
such as taxonomy embedding, link prediction in networks and predicting
lexical entailment.

# Embeddings and Hyperbolic Geometry

Hyperbolic geometry is a non-Euclidean geometry which studies spaces of
constant negative curvature. It is, for instance, associated with
Minkowski spacetime in special relativity. In network science,
hyperbolic spaces have started to receive attention as they are
well-suited to model hierarchical data. For instance, consider the task
of embedding a tree into a metric space such that its structure is
reflected in the embedding. A regular tree with branching factor $`b`$
has $`(b + 1)b^{\ell-1}`$ nodes at level $`\ell`$ and
$`((b + 1)b^\ell - 2) /
(b - 1)`$ nodes on a level less or equal than $`\ell`$. Hence, the
number of children grows exponentially with their distance to the root
of the tree. In hyperbolic geometry this kind of tree structure can be
modeled easily in two dimensions: nodes that are *exactly* $`\ell`$
levels below the root are placed on a sphere in hyperbolic space with
radius $`r \propto \ell`$ and nodes that are *less than* $`\ell`$ levels
below the root are located within this sphere. This type of construction
is possible as hyperbolic disc area and circle length grow exponentially
with their radius.[^1] See
<a href="#fig:tree-embedding-example" data-reference-type="ref+Label"
data-reference="fig:tree-embedding-example">[fig:tree-embedding-example]</a>
for an example. Intuitively, hyperbolic spaces can be thought of as
continuous versions of trees or vice versa, trees can be thought of as
"discrete hyperbolic spaces" . In $`\mathbb{R}^2`$, a similar
construction is not possible as circle length ($`2\pi r`$) and disc area
($`2\pi r^2`$) grow only linearly and quadratically with regard to $`r`$
in Euclidean geometry. Instead, it is necessary to increase the
dimensionality of the embedding to model increasingly complex
hierarchies. As the number of parameters increases, this can lead to
computational problems in terms of runtime and memory complexity as well
as to overfitting.

<figure id="fig:poin-dist">
<div class="minipage">
<p><span id="fig:geodesics" data-label="fig:geodesics"></span></p>
</div>
<div class="minipage">
<p><embed src="plot_tree_embedding.pdf" /> <span
id="fig:tree-embedding-example"
data-label="fig:tree-embedding-example"></span></p>
</div>
<div class="minipage">
<p><img src="plot_poindist2.png" alt="image" /> <span id="fig:poin-dist"
data-label="fig:poin-dist"></span></p>
</div>
<figcaption> Due to the negative curvature of <span
class="math inline">ℬ</span>, the distance of points increases
exponentially (relative to their Euclidean distance) the closer they are
to the boundary. Growth of the Poincaré distance <span
class="math inline"><em>d</em>(<strong>u</strong>, <strong>v</strong>)</span>
relative to the Euclidean distance and the norm of <span
class="math inline"><strong>v</strong></span> (for fixed <span
class="math inline">∥<strong>u</strong>∥ = 0.9</span>). Embedding of a
regular tree in <span class="math inline">ℬ<sup>2</sup></span> such that
all connected nodes are spaced equally far apart (i.e., all black line
segments have identical hyperbolic length).</figcaption>
</figure>

Due to these properties, hyperbolic space has recently been considered
to model complex networks. For instance, introduced hyperbolic geometry
for greedy routing in geographic communication networks. Similarly,
proposed hyperbolic embeddings of the AS Internet topology to perform
greedy shortest path routing in the embedding space. developed a
framework to model complex networks using hyperbolic spaces and
discussed how typical properties such as heterogeneous degree
distributions and strong clustering emerges by assuming an underlying
hyperbolic geometry to these networks. proposed a measure based on
Gromov’s $`\delta`$-hyperbolicity to characterize the tree-likeness of
graphs.

In machine learning and artificial intelligence on the other hand,
Euclidean embeddings have become a popular approach for learning from
symbolic data. For instance, in addition to the methods discussed in
<a href="#sec:intro" data-reference-type="ref+Label"
data-reference="sec:intro">1</a>, proposed one of the first embedding
methods to learn from relational data. More recently, Holographic and
Complex Embeddings have shown state-of-the-art performance in Knowledge
Graph completion. In relation to hierarchical representations, proposed
to learn density-based word representations, i.e., Gaussian embeddings,
to capture uncertainty and asymmetry. Given information about
hierarchical relations in the form of ordered input pairs, proposed
Order Embeddings to model visual-semantic hierarchies over words,
sentences, and images.

# Poincaré Embeddings

In the following, we are interested in finding embeddings of symbolic
data such that their distance in the embedding space reflects their
semantic similarity. We assume that there exists a latent hierarchy in
which the symbols can be organized. In addition to the similarity of
objects, we intend to also reflect this hierarchy in the embedding space
to improve over existing methods in two ways:

1.  By inducing an appropriate bias on the structure of the embedding
    space, we aim at learning more parsimonious embeddings for superior
    generalization performance and decreased runtime and memory
    complexity.

2.  By capturing the hierarchy explicitly in the embedding space, we aim
    at gaining additional insights about the relationships between
    symbols and the importance of individual symbols.

However, we do not assume that we have direct access to information
about the hierarchy, e.g., via ordered input pairs. Instead, we consider
the task of inferring the hierarchical relationships fully unsupervised,
as is, for instance, necessary for text and network data. For these
reasons – and motivated by the discussion in
<a href="#sec:hyperbolic" data-reference-type="ref+Label"
data-reference="sec:hyperbolic">2</a> – we embed symbolic data into
hyperbolic space $`\mathbb{H}`$. In contrast to Euclidean space
$`\mathbb{R}`$, there exist multiple, equivalent models of
$`\mathbb{H}`$ such as the Beltrami-Klein model, the hyperboloid model,
and the Poincaré half-plane model. In the following, we will base our
approach on the Poincaré ball model, as it is well-suited for
gradient-based optimization.[^2] In particular, let
$`{\mathcal{B}^d = \{\bm{x}\in \mathbb{R}^d\ |\ \|\bm{x}\| < 1\}}`$ be
the *open* $`d`$-dimensional unit ball, where $`\|\cdot\|`$ denotes the
Euclidean norm. The Poincaré ball model of hyperbolic space corresponds
then to the Riemannian manifold $`(\mathcal{B}^d, g_{\bm{x}})`$, i.e.,
the open unit ball equipped with the Riemannian metric tensor
``` math
g_{\bm{x}} = \left( \frac{2}{1 - \|\bm{x}\|^2} \right)^2 g^E ,
```
where $`\bm{x}\in \mathcal{B}^d`$ and $`g^E`$ denotes the Euclidean
metric tensor. Furthermore, the distance between points
$`\bm{u}, \bm{v}\in \mathcal{B}^d`$ is given as
``` math
\begin{aligned}
  d(\bm{u}, \bm{v}) & = \operatorname{arcosh}\left(1 + 2\frac{\|\bm{u}- \bm{v}\|^2}{(1 - \|\bm{u}\|^2)(1 - \|\bm{v}\|^2)}\right) \label{eq:distance} .
\end{aligned}
```
The boundary of the ball is denoted by $`\partial\mathcal{B}`$. It
corresponds to the sphere $`\mathcal{S}^{d-1}`$ and is not part of the
hyperbolic space, but represents infinitely distant points. Geodesics in
$`\mathcal{B}^d`$ are then circles that are orthogonal to
$`\partial \mathcal{B}`$ (as well as all diameters). See
<a href="#fig:geodesics" data-reference-type="ref+Label"
data-reference="fig:geodesics">[fig:geodesics]</a> for an illustration.

It can be seen from
<a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a>, that the distance within
the Poincaré ball changes smoothly with respect to the location of
$`\bm{u}`$ and $`\bm{v}`$. This locality property of the Poincaré
distance is key for finding continuous embeddings of hierarchies. For
instance, by placing the root node of a tree at the origin of
$`\mathcal{B}^d`$ it would have a relatively small distance to all other
nodes as its Euclidean norm is zero. On the other hand, leaf nodes can
be placed close to the boundary of the Poincaré ball as the distance
grows very fast between points with a norm close to one. Furthermore,
please note that <a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a> is symmetric and that the
hierarchical organization of the space is solely determined by the
distance of points to the origin. Due to this self-organizing property,
<a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a> is applicable in an
unsupervised setting where the hierarchical order of objects is not
specified in advance such as text and networks. Remarkably,
<a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a> allows us therefore to
learn embeddings that simultaneously capture the hierarchy of objects
(through their norm) as well a their similarity (through their
distance).

Since a single hierarchical structure can already be represented in two
dimensions, the Poincaré disk ($`\mathcal{B}^2`$) is typically used to
represent hyperbolic geometry. In our method, we instead use the
Poincaré ball ($`\mathcal{B}^d`$), for two main reasons: First, in many
datasets such as text corpora, multiple latent hierarchies can co-exist,
which can not always be modeled in two dimensions. Second, a larger
embedding dimension can decrease the difficulty for an optimization
method to find a good embedding (also for single hierarchies) as it
allows for more degrees of freedom during the optimization process.

To compute Poincaré embeddings for a set of symbols
$`\mathcal{S} = \{x_i\}_{i=1}^n`$, we are then interested in finding
embeddings $`\Theta = \{\bm{\theta}_i\}_{i=1}^n`$, where
$`\bm{\theta}_i \in
\mathcal{B}^d`$. We assume we are given a problem-specific loss function
$`\mathcal{L}(\Theta)`$ which encourages semantically similar objects to
be close in the embedding space according to their Poincaré distance. To
estimate $`\Theta`$, we then solve the optimization problem
``` math
\Theta^\prime \gets \mathop{\mathrm{arg\,min}}_{\Theta} \mathcal{L}(\Theta) \quad\quad \text{s.t. } \forall\, \bm{\theta}_i \in \Theta: \|\bm{\theta}_i\| < 1 .\label{eq:loss}
```
We will discuss specific loss functions in
<a href="#sec:experiments" data-reference-type="ref+Label"
data-reference="sec:experiments">4</a>.

## Optimization

Since the Poincaré Ball has a Riemannian manifold structure, we can
optimize <a href="#eq:loss" data-reference-type="ref+Label"
data-reference="eq:loss">[eq:loss]</a> via stochastic Riemannian
optimization methods such as RSGD or RSVRG . In particular, let
$`\mathcal{T}_{\theta} \mathcal{B}`$ denote the tangent space of a point
$`\bm{\theta}\in \mathcal{B}^d`$. Furthermore, let $`{\nabla_R \in
\mathcal{T}_{\theta} \mathcal{B}}`$ denote the Riemannian gradient of
$`\mathcal{L}(\bm{\theta})`$ and let $`\nabla_E`$ denote the Euclidean
gradient of $`\mathcal{L}(\bm{\theta})`$. Using RSGD, parameter updates
to minimize <a href="#eq:loss" data-reference-type="ref+Label"
data-reference="eq:loss">[eq:loss]</a> are then of the form
``` math
\bm{\theta}_{t+1} = \mathfrak{R}_{\theta_t}\left(-\eta_t \nabla_R \mathcal{L}(\bm{\theta}_t) \right)
```
where $`\mathfrak{R}_{\theta_t}`$ denotes the retraction onto
$`\mathcal{B}`$ at $`\bm{\theta}`$ and $`\eta_t`$ denotes the learning
rate at time $`t`$. Hence, for the minimization of
<a href="#eq:loss" data-reference-type="ref+Label"
data-reference="eq:loss">[eq:loss]</a>, we require the Riemannian
gradient and a suitable retraction. Since the Poincaré ball is a
conformal model of hyperbolic space, the angles between adjacent vectors
are identical to their angles in the Euclidean space. The length of
vectors however might differ. To derive the Riemannian gradient from the
Euclidean gradient, it is sufficient to rescale $`\nabla_E`$ with the
inverse of the Poincaré ball metric tensor, i.e., $`g^{-1}_\theta`$.
Since $`g_\theta`$ is a scalar matrix, the inverse is trivial to
compute. Furthermore, since
<a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a> is fully differentiable,
the Euclidean gradient can easily be derived using standard calculus. In
particular, the Euclidean gradient $`\nabla_E =
\frac{\partial \mathcal{L}(\bm{\theta})}{\partial d(\bm{\theta}, \bm{x})} \frac{\partial d(\bm{\theta}, \bm{x})}{\partial \bm{\theta}}`$
depends on the gradient of $`\mathcal{L}`$, which we assume is known,
and the partial derivatives of the Poincaré distance, which can be
computed as follows: Let $`\alpha = 1 - \|\bm{\theta}\|^2`$ ,
$`\beta = 1 - \|\bm{x}\|^2`$ and let
``` math
\gamma = 1 + \frac{2}{\alpha \beta} \|\bm{\theta}-\bm{x}\|^2
```
The partial derivate of the Poincaré distance with respect to
$`\bm{\theta}`$ is then given as
``` math
\frac{\partial d(\bm{\theta}, \bm{x})}{\partial \bm{\theta}} = \frac{4}{\beta \sqrt{\gamma^2 - 1}} \left(\frac{\|\bm{x}\|^2 - 2\langle\bm{\theta}, \bm{x}\rangle + 1}{\alpha^2} \bm{\theta}- \frac{\bm{x}}{\alpha} \right) . \label{eq:partial}
```
Since $`d(\cdot, \cdot)`$ is symmetric, the partial derivative
$`\frac{\partial d(\bm{x}, \bm{\theta})}{\partial
\bm{\theta}}`$ can be derived analogously. As retraction operation we
use $`\mathfrak{R}_\theta(\bm{v}) = \bm{\theta}+ \bm{v}`$. In
combination with the Riemannian gradient, this corresponds then to the
well-known natural gradient method . Furthermore, we constrain the
embeddings to remain within the Poincaré ball via the projection
``` math
\text{proj}(\bm{\theta}) = \begin{cases}
  \bm{\theta}/ \|\bm{\theta}\| - \varepsilon & \text{if }\|\bm{\theta}\| \geq 1 \\
  \bm{\theta}& \text{otherwise ,}
  \end{cases}
```
where $`\varepsilon`$ is a small constant to ensure numerical stability.
In all experiments we used $`\varepsilon = 10^{-5}`$. In summary, the
full update for a single embedding is then of the form
``` math
\bm{\theta}_{t+1} \gets \text{proj}\left(\bm{\theta}_t - \eta_t \frac{(1 - \|\bm{\theta}_t\|^2)^2}{4} \nabla_E \right) \label{eq:update} .
```

It can be seen from
<a href="#eq:partial,eq:update" data-reference-type="ref+Label"
data-reference="eq:partial,eq:update">[eq:partial,eq:update]</a> that
this algorithm scales well to large datasets, as the computational and
memory complexity of an update depends linearly on the embedding
dimension. Moreover, the algorithm is straightforward to parallelize via
methods such as Hogwild , as the updates are sparse (only a small number
of embeddings are modified in an update) and collisions are very
unlikely on large-scale data.

## Training Details

In addition to this optimization procedure, we found that the following
training details were helpful for obtaining good representations: First,
we initialize all embeddings randomly from the uniform distribution
$`{\mathcal{U}(-0.001,0.001)}`$. This causes embeddings to be
initialized close to the origin of $`\mathcal{B}^d`$. Second, we found
that a good initial angular layout can be helpful to find good
embeddings. For this reason, we train during an initial "burn-in" phase
with a reduced learning rate $`\eta / c`$. In combination with
initializing close to the origin, this can improve the angular layout
without moving too far towards the boundary. In our experiments, we set
$`{c=10}`$ and the duration of the burn-in to 10 epochs.

# Evaluation

In this section, we evaluate the quality of Poincaré embeddings for a
variety of tasks, i.e., for the embedding of taxonomies, for link
prediction in networks, and for modeling lexical entailment. We compare
the **Poincaré** distance as defined in
<a href="#eq:distance" data-reference-type="ref+Label"
data-reference="eq:distance">[eq:distance]</a> to the following two
distance functions:

Euclidean  
In all cases, we include the Euclidean distance $`{d(\bm{u},\bm{v}) =
               \|\bm{u}- \bm{v}\|^2}`$. As the Euclidean distance is
flat and symmetric, we expect that it requires a large dimensionality to
model the hierarchical structure of the data.

Translational  
For asymmetric data, we also include the score function
$`{d(\bm{u}, \bm{v}) = \|\bm{u}- \bm{v}+ \bm{r}\|^2}`$, as proposed by
for modeling large-scale graph-structured data. For this score function,
we also learn the global translation vector $`\bm{r}`$ during training.

Note that the translational score function has, due to its asymmetry,
more information about the nature of an embedding problem than a
symmetric distance when the order of $`(u,v)`$ indicates the hierarchy
of elements. This is, for instance, the case for
$`{\texttt{is-a}(u,v)}`$ relations in taxonomies. For the Poincaré
distance and the Euclidean distance we could randomly permute the order
of $`(u,v)`$ and obtain the identical embedding, while this is not the
case for the translational score function. As such, it is not fully
unsupervised and only applicable where this hierarchical information is
available.

## Embedding Taxonomies

In the first set of experiments, we are interested in evaluating the
ability of Poincaré embeddings to embed data that exhibits a clear
latent hierarchical structure. For this purpose, we conduct experiments
on the *transitive closure* of the
<span class="smallcaps">WordNet</span> noun hierarchy in two settings:

Reconstruction  
To evaluate representation capacity, we embed fully observed data and
reconstruct it from the embedding. The reconstruction error in relation
to the embedding dimension is then a measure for the capacity of the
model.

Link Prediction  
To test generalization performance, we split the data into a train,
validation and test set by randomly holding out observed links. Links in
the validation and test set do not include the root or leaf nodes as
these links would either be trivial to predict or impossible to predict
reliably.

Since we are using the transitive closure, the hypernymy relations form
a directed acyclic graph such that the hierarchical structure is not
directly visible from the raw data but has to be inferred. The
transitive closure of the <span class="smallcaps">WordNet</span> noun
hierarchy consists of 82,115 nouns and 743,241 hypernymy relations. On
this data, we learn embeddings in both settings as follows: Let
$`\mathcal{D} = \{(u, v)\}`$ be the set of observed hypernymy relations
between noun pairs. We then learn embeddings of all symbols in
$`\mathcal{D}`$ such that related objects are close in the embedding
space. In particular, we minimize the loss function
``` math
\mathcal{L}(\Theta) = \sum_{(u,v) \in \mathcal{D}}\log \frac{e^{-d(\bm{u},\bm{v})}}{\sum_{\bm{v}^\prime \in \mathcal{N}(u)} e^{-d(\bm{u},\bm{v}^\prime)}} , \label{eq:soft-ranking}
```
where
$`\mathcal{N}(u) = \{v\ |\ (u, v) \not \in \mathcal{D}\} \cup \{u\}`$ is
the set of negative examples for $`u`$ (including $`u`$). For training,
we randomly sample 10 negative examples per positive example.
<a href="#eq:soft-ranking" data-reference-type="ref+Label"
data-reference="eq:soft-ranking">[eq:soft-ranking]</a> can be
interpreted as a soft ranking loss where related objects should be
closer than objects for which we didn’t observe a relationship. This
choice of loss function is motivated by the fact that we don’t want to
push symbols belonging to distinct subtrees arbitrarily far apart as
their subtrees might still be close. Instead we want them to be farther
apart than symbols with an observed relation.

<div class="tabular">

lllHcccccc & & &  
(l)4-10 & & & 2 & 5 & 10 & 20 & 50 & 100 & 200  
& & Rank & 9085.6 & 3542.3 & 2286.9 & 1685.9 & 1281.7 & 1187.3 &
1157.3  
& & MAP & 0.003 & 0.024 & 0.059 & 0.087 & 0.140 & 0.162 & 0.168  
(l)2-10 & & Rank & 383.9 & 205.9 & 179.4 & 95.3 & 92.8 & 92.7 & 91.0  
& & MAP & 0.426 & 0.517 & 0.503 & 0.563 & 0.566 & 0.562 & 0.565  
(l)2-10 & & Rank & 75.1 & 4.9 & 4.02 & 3.84 & 3.98 & 3.9 & **3.83  
& & MAP & - & 0.823 & 0.851 & 0.855 & 0.86 & 0.857 & **0.87  
& & Rank & 7646.2 & 3311.1 & 2199.5 & 952.3 & 351.4 & 190.7 & 81.5  
& & MAP & 0.003 & 0.024 & 0.059 & 0.176 & 0.286 & 0.428 & 0.490  
(l)2-10 & & Rank & 133.7 & 65.7 & 56.6 & 52.1 & 47.2 & 43.2 & 40.4  
& & MAP & 0.484 & 0.545 & 0.554 & 0.554 & 0.56 & 0.562 & 0.559  
(l)2-10 & & Rank & 76.6 & 5.7 & **4.3 & 4.9 & 4.6 & 4.6 & 4.6  
& & MAP & - & 0.825 & 0.852 & 0.861 & **0.863 & 0.856 & 0.855  
********

</div>

We evaluate the quality of the embeddings as commonly done for graph
embeddings : For each observed relationship $`(u, v)`$, we rank its
distance $`d(\bm{u},\bm{v})`$ among the ground-truth negative examples
for $`u`$, i.e., among the set $`{\{d(\bm{u}, \bm{v}^\prime)\ |\ (u,
v^\prime) \not \in \mathcal{D})\}}`$. In the Reconstruction setting, we
evaluate the ranking on all nouns in the dataset. We then record the
mean rank of $`v`$ as well as the mean average precision (MAP) of the
ranking. The results of these experiments are shown in
<a href="#tab:embedding-nouns" data-reference-type="ref+Label"
data-reference="tab:embedding-nouns">[tab:embedding-nouns]</a>. It can
be seen that Poincaré embeddings are very successful in the embedding of
large taxonomies – both with regard to their representation capacity and
their generalization performance. Even compared to Translational
embeddings, which have more information about the structure of the task,
Poincaré embeddings show a greatly improved performance while using an
embedding that is smaller by an order of magnitude. Furthermore, the
results of Poincaré embeddings in the link prediction task are very
robust with regard to the embedding dimension. We attribute this result
to the structural bias of Poincaré embeddings, what could lead to
reduced overfitting on this kind of data with a clear latent hierarchy.
In <a href="#fig:mammals-viz" data-reference-type="ref+Label"
data-reference="fig:mammals-viz">2</a> we show additionally a
visualization of a two-dimensional Poincaré embedding. For purpose of
clarity, this embedding has been trained only on the mammals subtree of
<span class="smallcaps">WordNet</span>.

<figure id="fig:mammals-viz">
<div class="minipage">
<p><img src="plot_wn_mammals_intermediate_crop.png" style="width:90.0%"
alt="image" /> <span id="fig:mammals_intermediate"
data-label="fig:mammals_intermediate"></span></p>
</div>
<div class="minipage">
<p><img src="plot_wn_mammals_converged_crop.png" alt="image" /> <span
id="fig:mammals_converged"
data-label="fig:mammals_converged"></span></p>
</div>
<figcaption>Two-dimensional Poincaré embeddings of transitive closure of
the <span class="smallcaps">WordNet</span> mammals subtree. Ground-truth
<code>is-a</code> relations of the original <span
class="smallcaps">WordNet</span> tree are indicated via blue edges. A
Poincaré embedding with <span class="math inline"><em>d</em> = 5</span>
achieves mean rank 1.26 and MAP 0.927 on this subtree. <span
id="fig:mammals-viz" data-label="fig:mammals-viz"></span></figcaption>
</figure>

## Network Embeddings

Next, we evaluated the performance of Poincaré embeddings for link
prediction in networks. Since edges in complex networks can often be
explained via latent hierarchies over their nodes , we are interested in
the benefits of Poincaré embeddings both in terms representation size
and generalization performance. We performed our experiments on four
commonly used social networks, i.e,
<span class="smallcaps">AstroPh</span>,
<span class="smallcaps">CondMat</span>,
<span class="smallcaps">GrQc</span>, and
<span class="smallcaps">HepPh</span>. These networks represent
scientific collaborations such that there exists an undirected edge
between two persons if they co-authored a paper. For these networks, we
model the probability of an edge as proposed by via the Fermi-Dirac
distribution
``` math
P((u,v) = 1\ |\ \Theta) = \frac{1}{e^{(d(\bm{u},\bm{v}) - r)/ t} + 1} \label{eq:fermi}
```
where $`r, t > 0`$ are hyperparameters. Here, $`r`$ corresponds to the
radius around each point $`\bm{u}`$ such that points within this radius
are likely to have an edge with $`u`$. The parameter $`t`$ specifies the
steepness of the logistic function and influences both average
clustering as well as the degree distribution . We use the cross-entropy
loss to learn the embeddings and sample negatives as in
<a href="#sec:taxonomies" data-reference-type="ref+Label"
data-reference="sec:taxonomies">4.1</a>.

For evaluation, we split each dataset randomly into train, validation,
and test set. The hyperparameters $`r`$ and $`t`$ where tuned for each
method on the validation set.
<a href="#tab:network" data-reference-type="ref+Label"
data-reference="tab:network">1</a> lists the MAP score of Poincaré and
Euclidean embeddings on the test set for the hyperparameters with the
best validation score. Additionally, we again list the reconstruction
performance without missing data. Translational embeddings are not
applicable to these datasets as they consist of undirected edges. It can
be seen that Poincaré embeddings perform again very well on these
datasets and – especially in the low-dimensional regime – outperform
Euclidean embeddings.

<div id="tab:network">

|  |  | **Dimensionality** |  |  |  |  |  |  |  |
|:---|:---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 3-10 |  | **Reconstruction** |  |  |  | **Link Prediction** |  |  |  |
| 3-6 (l)7-10 |  | 10 | 20 | 50 | 100 | 10 | 20 | 50 | 100 |
| <span class="smallcaps">AstroPh</span> | **Euclidean** | 0.376 | 0.788 | 0.969 | 0.989 | 0.508 | 0.815 | 0.946 | 0.960 |
| N=18,772; E=198,110 | **Poincaré** | 0.703 | 0.897 | 0.982 | 0.990 | 0.671 | 0.860 | 0.977 | 0.988 |
| <span class="smallcaps">CondMat</span> | **Euclidean** | 0.356 | 0.860 | 0.991 | 0.998 | 0.308 | 0.617 | 0.725 | 0.736 |
| N=23,133; E=93,497 | **Poincaré** | 0.799 | 0.963 | 0.996 | 0.998 | 0.539 | 0.718 | 0.756 | 0.758 |
| <span class="smallcaps">GrQc</span> | **Euclidean** | 0.522 | 0.931 | 0.994 | 0.998 | 0.438 | 0.584 | 0.673 | 0.683 |
| N=5,242; E=14,496 | **Poincaré** | 0.990 | 0.999 | 0.999 | 0.999 | 0.660 | 0.691 | 0.695 | 0.697 |
| <span class="smallcaps">HepPh</span> | **Euclidean** | 0.434 | 0.742 | 0.937 | 0.966 | 0.642 | 0.749 | 0.779 | 0.783 |
| N=12,008; E=118,521 | **Poincaré** | 0.811 | 0.960 | 0.994 | 0.997 | 0.683 | 0.743 | 0.770 | 0.774 |

Mean average precision for Reconstruction and Link Prediction on network
data.

</div>

## Lexical Entailment

An interesting aspect of Poincaré embeddings is that they allow us to
make graded assertions about hierarchical relationships as hierarchies
are represented in a continuous space. We test this property on
<span class="smallcaps">HyperLex</span> , which is a gold standard
resource for evaluating how well semantic models capture graded lexical
entailment by quantifying to what *degree* $`X`$ is a type of $`Y`$ via
ratings on a scale of $`[0,10]`$. Using the noun part of
<span class="smallcaps">HyperLex</span>, which consists of 2163 rated
noun pairs, we then evaluated how well Poincaré embeddings reflect these
graded assertions. For this purpose, we used the Poincaré embeddings
that were obtained in
<a href="#sec:taxonomies" data-reference-type="ref+Label"
data-reference="sec:taxonomies">4.1</a> by embedding
<span class="smallcaps">WordNet</span> with a dimensionality $`d=5`$.
Note that these embeddings were not specifically trained for this task.
To determine to what extent $`\texttt{is-a}(u, v)`$ is true, we used the
score function:
``` math
\operatorname{score}(\texttt{is-a}(u,v)) = -(1 + \alpha (\|\bm{v}\| - \|\bm{u}\|)) d(\bm{u}, \bm{v}) \label{eq:hyperlex-score} .
```
Here, the term $`\alpha(\|\bm{v}\| - \|\bm{u}\|)`$ acts as a penalty
when $`v`$ is lower in the embedding hierarchy, i.e., when $`\bm{v}`$
has a higher norm than $`\bm{u}`$. The hyperparameter $`\alpha`$
determines the severity of the penalty. In our experiments we set
$`\alpha = 10^3`$.

Using <a href="#eq:hyperlex-score" data-reference-type="ref+Label"
data-reference="eq:hyperlex-score">[eq:hyperlex-score]</a>, we scored
all noun pairs in <span class="smallcaps">HyperLex</span> and recorded
Spearman’s rank correlation with the ground-truth ranking. The results
of this experiment are shown in
<a href="#tab:hyperlex-spearman" data-reference-type="ref+Label"
data-reference="tab:hyperlex-spearman">2</a>. It can be seen that the
ranking based on Poincaré embeddings clearly outperforms all
state-of-the-art methods evaluated in . Methods in
<a href="#tab:hyperlex-spearman" data-reference-type="ref+Label"
data-reference="tab:hyperlex-spearman">2</a> that are prefixed with WN
also use <span class="smallcaps">WordNet</span> as a basis and therefore
are most comparable. The same embeddings also achieved a
state-of-the-art accuracy of $`0.86`$ on
<span class="smallcaps">Wbless</span> , which evaluates non-graded
lexical entailment.

<div id="tab:hyperlex-spearman">

|  | **FR** | **SLQS-Sim** | **WN-Basic** | **WN-WuP** | **WN-LCh** | **Vis-ID** | **Euclidean** | **Poincaré** |
|:---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $`\rho`$ | 0.283 | 0.229 | 0.240 | 0.214 | 0.214 | 0.253 | 0.389 | 0.512 |

Spearman’s $`\rho`$ for Lexical Entailment on
<span class="smallcaps">HyperLex</span>.

</div>

# Discussion and Future Work

In this paper, we introduced Poincaré embeddings for learning
representations of symbolic data and showed how they can simultaneously
learn the similarity and the hierarchy of objects. Furthermore, we
proposed an efficient algorithm to compute the embeddings and showed
experimentally, that Poincaré embeddings provide important advantages
over Euclidean embeddings on hierarchical data: First, Poincaré
embeddings enable very parsimonious representations whats allows us to
learn high-quality embeddings of large-scale taxonomies. Second,
excellent link prediction results indicate that hyperbolic geometry can
introduce an important structural bias for the embedding of complex
symbolic data. Third, state-of-the-art results for predicting lexical
entailment suggest that the hierarchy in the embedding space corresponds
well to the underlying semantics of the data.

The main focus of this work was to evaluate the general properties of
hyperbolic geometry for the embedding of symbolic data. In future work,
we intend, to both expand the applications of Poincaré embeddings – for
instance to multi-relational data – and also to derive models that are
tailored to specific applications such as word embeddings. Furthermore,
we have shown that natural gradient based optimization already produces
very good embeddings and scales to large datasets. We expect that a full
Riemannian optimization approach can further increase the quality of the
embeddings and lead to faster convergence.

[^1]: For instance, in a two dimensional hyperbolic space with constant
    curvature $`K=-1`$, the length of a circle is given as
    $`2 \pi \sinh r`$ while the area of a disc is given as
    $`2\pi (\cosh r - 1)`$. Since $`\sinh r =
    \frac{1}{2}(e^r - e^{-r})`$ and
    $`\cosh r = \frac{1}{2}(e^r + e^{-r})`$, both disc area and circle
    length grow exponentially with $`r`$.

[^2]: It can be seen easily that the distance function of the Poincare
    ball in <a href="#eq:distance" data-reference-type="ref+Label"
    data-reference="eq:distance">[eq:distance]</a> is differentiable.
    Hence, for this model, an optimization algorithm only needs to
    maintain the constraint that $`\|\bm{x}\| < 1`$ for all embeddings.
    Other models of hyperbolic space however, would be more more
    difficult to optimize, either due to the form of their distance
    function or due to the constraints that they introduce. For
    instance, the hyperboloid model is constrained to points where
    $`\langle \bm{x}, \bm{x}\rangle = -1`$, while the distance function
    of the Beltrami-Klein model requires to compute the location of
    ideal points on the boundary $`\partial \mathcal{B}`$ of the unit
    ball.
