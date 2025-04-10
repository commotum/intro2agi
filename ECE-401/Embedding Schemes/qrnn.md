# Quaternion Recurrent Neural Networks

## Authors
- Titouan Parcollet (LIA, Université d'Avignon, France & Orkis, Aix-en-provence, France)
- Mirco Ravanelli (MILA, Université de Montréal, Québec, Canada)
- Mohamed Morchid (LIA, Université d'Avignon, France)
- Georges Linarès (LIA, Université d'Avignon, France)
- Chiheb Trabelsi (MILA, Université de Montréal & Element AI, Montréal, Québec, Canada)
- Renato De Mori (LIA, Université d'Avignon, France & McGill University, Québec, Canada)
- Yoshua Bengio* (MILA, Université de Montréal, Québec, Canada)

*CIFAR Senior Fellow

## Contact
- titouan.parcollet@alumni.univ-avignon.fr
- mirco.ravanelli@gmail.com
- firstname.lastname@univ-avignon.fr
- chiheb.trabelsi@polymtl.ca
- rdemori@cs.mcgill.ca

## Abstract

Recurrent neural networks (RNNs) are powerful architectures for modeling sequential data, as they can learn both short and long-term dependencies between sequence elements. However, many common tasks like speech and image recognition involve multi-dimensional input features with strong internal dependencies between dimensions. 

We propose two novel architectures:
- A quaternion recurrent neural network (QRNN)
- A quaternion long-short term memory neural network (QLSTM)

These networks leverage quaternion algebra to handle both:
1. External relations between sequence elements
2. Internal structural dependencies within multi-dimensional features

Similar to capsule networks, quaternions enable QRNNs to encode internal dependencies by processing multi-dimensional features as unified entities. The recurrent operations then reveal correlations between sequence elements.

Our key findings:
- Both QRNN and QLSTM outperform standard RNN and LSTM models in automatic speech recognition tasks
- They achieve this while using 3.3x fewer parameters compared to real-valued RNNs/LSTMs
- This leads to more compact and efficient representations of the relevant information


# Introduction

In recent years, deep neural networks (DNNs) have achieved remarkable success across various domains due to their ability to learn highly complex input-to-output mappings. Among DNN architectures, recurrent neural networks (RNNs) are particularly well-suited for processing sequential data, as they build activation vectors at each timestep to encode latent relations between input vectors. Deep RNNs have demonstrated state-of-the-art performance in speech recognition tasks and have been successfully used to obtain hidden representations of speech unit sequences and text word sequences.

However, many modern tasks involve multi-dimensional input features, such as:
- Image pixels
- Acoustic features 
- 3D model orientations

These require representing both:
1. External dependencies between different entities
2. Internal relations between features within each entity 

Additionally, RNN-based algorithms typically require a large number of parameters to represent sequential data in the hidden space.

Quaternions offer an elegant solution as hypercomplex numbers containing:
- One real component
- Three separate imaginary components

This structure makes them ideal for handling 3D and 4D feature vectors, with applications in:
- Image processing
- Robot kinematics
- Color image processing

Similar to capsule networks, quaternions bundle groups of features together rather than using traditional homogeneous representations. This allows quaternion-based neural networks to encode latent inter-dependencies between feature groups during learning, while using fewer parameters than standard RNNs through the Hamilton product (the quaternion equivalent of ordinary multiplication).

Early applications of quaternion-valued backpropagation showed promise in function approximation tasks. Recent years have seen renewed interest in complex and hypercomplex neural networks, with successful applications including:
- Deep quaternion networks
- Quaternion convolutional networks  
- Complex convolutional networks

However, these advances have not yet been extended to recurrent architectures with quaternion algebra operations.

This paper introduces:
1. The Quaternion Recurrent Neural Network (QRNN)
2. The Quaternion Long-Short Term Memory Network (QLSTM) 

These novel architectures integrate local spectral features using quaternion algebra. We propose specialized parameter initialization techniques and demonstrate that these models can learn both:
- Inter-dependencies between multi-dimensional features
- Intra-dependencies between sequence elements

Using significantly fewer parameters (3.3x reduction) compared to real-valued networks.

Our experimental results on the TIMIT phoneme recognition task show:
- QRNN achieves 18.5% PER vs 19.0% for standard RNN
- QLSTM achieves 15.1% PER vs 15.3% for standard LSTM

Similar improvements were observed on the larger Wall Street Journal dataset (detailed in Appendix).

The code is available at: https://github.com/Orkis-Research/Pytorch-Quaternion-Neural-Networks


# Motivations

A major challenge of current machine learning models is to effectively represent the vast amount of data available for modern tasks in the latent space. A good model needs to efficiently encode:

1. Local relations within input features (e.g. between R,G,B channels of a pixel)
2. Structural relations (e.g. edges or shapes composed of pixel groups)

Additionally, to learn adequate representations from available training data while avoiding overfitting, the neural architecture should minimize the number of parameters to be estimated. Below we detail the motivations for using quaternion-valued RNNs instead of real-valued ones to encode inter and intra feature dependencies with fewer parameters.

## Better Representation of Multidimensional Data

We need to explore better ways to represent multidimensional data that naturally capture internal feature relations. For example, when representing image data:

- Traditional real-valued networks: Treat each pixel as separate uni-dimensional elements that *could* be related
- Better approach: Consider each pixel as a whole entity of three strongly related elements

With real-valued RNNs, latent relations between RGB components of a pixel are difficult to encode since weights must discover these relations among all image pixels. Quaternions effectively solve this by:

- Being four-dimensional numbers with one real and three imaginary components
- Allowing construction and processing of entities with up to 4 related features
- Using quaternion algebra and Hamilton product to capture internal latent feature relations

Research has shown quaternion neural networks (QNNs) succeed where real-valued NNs fail at:
- Restoring spatial relations in 3D coordinates [Matsui 2004]
- Processing color pixels [Isokawa 2003]

This is because quaternion-weight components are shared across multiple quaternion-input parts during the Hamilton product, creating feature relations. As shown in Figure 1:

- Real-valued networks: Multiple weights needed to code latent relations are considered at same level as learning global relations
- Quaternion networks: Single quaternion weight w codes internal relations within unique quaternion Q_out during Hamilton product

## Parameter Efficiency

While larger neural networks often perform better, quaternion neural networks can handle the same signal dimensions with 4x fewer parameters:

- 4-number quaternion weight linking two 4-number quaternion units: 4 degrees of freedom
- Standard neural net parameterization: 4 x 4 = 16 degrees of freedom
- Result: 4-fold reduction in memory requirements

The natural multidimensional representation and parameter efficiency of quaternions make them better suited than real numbers for building efficient models in multidimensional spaces.

## Application to Speech Recognition

Modern automatic speech recognition systems typically use:

- Input sequences of multidimensional acoustic features (e.g. log Mel features)
- Features enriched with first, second and third time derivatives
- Traditional approach: Simple concatenation of static features with derivatives

However, time derivatives of spectral energy in a frequency band represent different views of the same input and are linearly correlated [Tokuda 2003]. Quaternion RNNs provide a more natural representation by embedding these multiple views directly in quaternion dimensions, potentially leading to better generalization.

![Quaternion vs Real-valued Layer Comparison](layer.png)
*Figure 1: Comparison of feature relation learning between quaternion-valued layer (right) using Hamilton product weight sharing and standard real-valued layer (left)*


%
% QRNN
%
\section{Quaternion recurrent neural networks}
\label{sec:qrnn}

This Section describes the quaternion algebra (Section \ref{subsec:qalgebra}), the internal quaternion representation (Section \ref{subsec:internal}), the backpropagation through time (BPTT) for quaternions (Section \ref{subsec:bptt}), and proposes an adapted weight initialization to quaternion-valued neurons (Section \ref{subsec:init}).


%
% QALGEBRA
%
\subsection{Quaternion algebra}
\label{subsec:qalgebra}

The quaternion algebra $\mathbb{H}$ defines operations between quaternion numbers. A quaternion Q is an extension of a complex number defined in a four dimensional space as:
\begin{align}
Q = r1 + x\textbf{i} + y\textbf{j} + z\textbf{k},
\end{align}
where $r$, $x$, $y$, and $z$ are real numbers, and $1$, \textbf{i}, \textbf{j}, and \textbf{k} are the quaternion unit basis. In a quaternion, $r$ is the real part, while $x\textbf{i}+y\textbf{j}+z\textbf{k}$ with $\textbf{i}^2=\textbf{j}^2=\textbf{k}^2=\textbf{i}\textbf{j}\textbf{k}=-1$ is the imaginary part, or the vector part. 
Such a definition can be used to describe spatial rotations. %An equivalent definition of the quaternion $Q$ is the following matrix of real numbers that turns out to be more suitable for computations:
The information embedded in the quaterion $Q$ can be summarized into the following matrix of real numbers:
\begin{align}
Q_{mat} = 
\begin{bmatrix}
   r & -x & -y & -z \\
   x & r & -z & y \\
   y & z & r & -x \\
   z & -y & x & r 
\end{bmatrix}.
\end{align}
The conjugate $Q^*$ of $Q$ is defined as:
\begin{align}
\label{eq:conjugate}
Q^*=r1-x\textbf{i}-y\textbf{j}-z\textbf{k}.
\end{align}
Then, a normalized or unit quaternion $Q^\triangleleft$ is expressed as:
\begin{align}
\label{eq:normalize}
Q^\triangleleft=\frac{Q}{\sqrt{r^2+x^2+y^2+z^2}}.
\end{align}
Finally, the {\em Hamilton product} $\otimes$ between two quaternions $Q_1$ and $Q_2$ is computed as follows: 
\begin{align}
\label{eq:hamilton}
Q_1 \otimes Q_2=&(r_1r_2-x_1x_2-y_1y_2-z_1z_2)+\nonumber
			(r_1x_2+x_1r_2+y_1z_2-z_1y_2) \boldsymbol i+\nonumber \\
            &(r_1y_2-x_1z_2+y_1r_2+z_1x_2) \boldsymbol j+
            (r_1z_2+x_1y_2-y_1x_2+z_1r_2) \boldsymbol k.
\end{align}
The {\em Hamilton product} (a graphical view is depicted in Figure~\ref{fig:proof}) is used in QRNNs to perform transformations of vectors representing quaternions, as well as scaling and interpolation between two rotations following a geodesic over a sphere in the $\mathbb{R}^3$ space as shown in~\citep{minemoto2017feed}.


%
% QUATERNION REPRESENTATION
%
\subsection{Quaternion representation}
\label{subsec:internal}

The QRNN is an extension of the real-valued \citep{medsker2001recurrent} and complex-valued \citep{hu2012global,song1998complex} recurrent neural networks to hypercomplex numbers. In a quaternion dense layer, all parameters are quaternions, including inputs, outputs, weights, and biases. The quaternion algebra is ensured by manipulating matrices of real numbers \citep{chase2017quat}. Consequently, for each input vector of size $N$, output vector of size $M$, dimensions are split into four parts: the first one equals to $r$, the second is $x\textbf{i}$, the third one equals to $y\textbf{j}$, and the last one to $z\textbf{k}$ to compose a quaternion $Q = r1+x\textbf{i}+y\textbf{j}+z\textbf{k}$. The inference process of a fully-connected layer is defined in the real-valued space by the dot product between an input vector and a real-valued $M \times N$ weight matrix. In a QRNN, this operation is replaced with the {\em Hamilton product} (Eq. \ref{eq:hamilton}) with quaternion-valued matrices (i.e. each entry in the weight matrix is a quaternion). The computational complexity of quaternion-valued models is discussed in Appendix \ref{app:complexity}


%
% LEARNING ALGORITHMS
%
\subsection{Learning algorithm}
\label{sec:learning}

The QRNN differs from the real-valued RNN in each learning sub-processes. Therefore, let $x_t$ be the input vector at timestep $t$, $h_t$ the hidden state, $W_{hx}$, $W_{hy}$ and $W_{hh}$ the input, output and hidden states weight matrices respectively. The vector $b_h$ is the bias of the hidden state and $p_t$, $y_t$ are the output and the expected target vectors. More details of the learning process and the parametrization are available on Appendix \ref{app:init}.


%
% FORWARD
%
\subsubsection{Forward phase}
\label{subsec:forward}

Based on the forward propagation of the real-valued RNN \citep{medsker2001recurrent}, the QRNN forward equations are extended as follows:
\begin{equation}
\label{eq:forward}
    h_t = \alpha(W_{hh} \otimes h_{t-1} + W_{hx} \otimes x_t + b_h),
\end{equation}
where  $\alpha$ is a {\em quaternion split activation function} \citep{xu2017learning,tripathi2016high} defined as:
\begin{equation}
\alpha(Q)=f(r)+f(x)\textbf{i}+f(y)\textbf{j}+f(z)\textbf{k},
\end{equation}
with $f$ corresponding to any standard activation function. The split approach is preferred in this work due to better prior investigations, better stability (i.e. pure quaternion activation functions contain singularities), and simpler computations. The output vector $p_t$ is computed as:
\begin{align}
    p_t = \beta(W_{hy} \otimes h_t),
\end{align}
where $\beta$ is any split activation function. Finally, the objective function is a classical loss applied component-wise (e.g., mean squared error, negative log-likelihood). 


%
% BACKWARD
%
\subsubsection{Quaternion Backpropagation Through Time}
\label{subsec:bptt}

The backpropagation through time (BPTT) for quaternion numbers (QBPTT) is an extension of the standard quaternion backpropagation \citep{nitta1995quaternary}, and its full derivation is available in Appendix \ref{app:qbptt}. The gradient with respect to the loss $E_t$ is expressed for each weight matrix as $\Delta^t_{hy} = \frac{\partial E_t}{\partial W_{hy}}$, $\Delta^t_{hh} =\frac{\partial E_t}{\partial W_{hh}}$, $\Delta^t_{hx} =\frac{\partial E_t}{\partial W_{hx}}$, for the bias vector as $\Delta^t_{b} =\frac{\partial E_t}{\partial B_{h}}$, and is generalized to $\Delta^t =\frac{\partial E_t}{\partial W}$ with:
\begin{align}
\centering
\pderiv{E_t}{W} = \pderiv{E_t}{W^r} + \textbf{i}\pderiv{E_t}{W^i} +\textbf{j}\pderiv{E_t}{W^j}+\textbf{k}\pderiv{E_t}{W^k}.
\end{align}
Each term of the above relation is then computed by applying the chain rule. Indeed, and conversaly to real-valued backpropagation, QBPTT must defines the dynamic of the loss \textit{w.r.t} to each component of the quaternion neural parameters. As a use-case for the equations, the mean squared error at a timestep $t$ and named $E_t$ is used as the loss function. Moreover, let $\lambda$ be a fixed learning rate. First, the weight matrix $W_{hy}$ is only seen in the equations of $p_t$. It is therefore straightforward to update each weight of $W_{hy}$ at timestep $t$ following:
\begin{align}
    W_{hy} = W_{hy} - \lambda\Delta^t_{hy}\otimes h^*_t, \ \text{with} \ \Delta_{hy}^t = \frac{\partial E_t}{\partial W_{hy}} = (p_t - y_t),
\end{align}
where $h^*_t$ is the conjugate of $h_t$. Then, the weight matrices $W_{hh}$, $W_{hx}$ and biases $b_{h}$ are arguments of $h_t$ with $h_{t-1}$ involved, and the update equations are derived as:
\begin{align}
    W_{hh} = W_{hh} - \lambda\Delta^t_{hh}, \quad W_{hx} = W_{hx} - \lambda\Delta^t_{hx}, \quad  b_{h} = b_h - \lambda\Delta^t_{b},
\end{align}
with,
\begin{align}
    \Delta_{hh}^t = \sum\limits_{m=0}^t  (\prod_{n=m}^{t} \delta_n ) \otimes h_{m-1}^*, \quad
    \Delta_{hx}^t = \sum\limits_{m=0}^t  (\prod_{n=m}^{t} \delta_n ) \otimes x_{m}^*, \quad
     \Delta_{b}^t = \sum\limits_{m=0}^t  (\prod_{n=m}^{t} \delta_n ),
\end{align}
and,
\begin{equation}
\begin{split}
\delta_{n} = \left\{
    \begin{array}{ll}
        W_{hh}^* \otimes\delta_{n+1}\times\alpha{'}(h_{n}^{preact}) & \mbox{if }  n \neq  t\\
        W_{hy}^* \otimes (p_{n} - y_{n}) \times \beta^{'}(p_{n}^{preact})  & \mbox{otherwise,}
    \end{array}
\right.
\end{split}
\end{equation}
with $h_{n}^{preact}$ and $p_{n}^{preact}$ the pre-activation values of $h_{n}$ and $p_{n}$ respectively. 


%
% PARAMS INIT
%
\subsection{Parameter initialization} 
\label{subsec:init}

A well-designed parameter initialization scheme strongly impacts the efficiency of a DNN. An appropriate initialization, in fact, improves DNN convergence, reduces the risk of exploding or vanishing gradient, and often leads to a substantial performance improvement \citep{glorot2010understanding}. It has been shown  that the backpropagation through time algorithm of RNNs is degraded by an inappropriated parameter initialization \citep{sutskever2013importance}. Moreover, an hyper-complex parameter cannot be simply initialized randomly and component-wise, due to the interactions between components. Therefore, this Section proposes a procedure reported in Algorithm 1 to initialize a matrix $W$ of quaternion-valued weights. The proposed initialization equations are derived from the polar form of a weight $w$ of $W$:  
\begin{align}
\label{eq:init}
\centering
w=|w|e^{q_{imag}^\triangleleft\theta}=|w|(cos(\theta) + q_{imag}^\triangleleft sin(\theta)),
\end{align}
and,
\begin{equation}
\label{eq:weight}
    \begin{gathered}
     w_\textbf{r} = \varphi \, cos(\theta), \quad
     w_\textbf{i} = \varphi \, q^\triangleleft_{imag\textbf{i}} \, sin(\theta), \quad
     w_\textbf{j} = \varphi \, q^\triangleleft_{imag\textbf{j}} \, sin(\theta), \quad 
     w_\textbf{k} = \varphi \, q^\triangleleft_{imag\textbf{k}} \, sin(\theta).
    \end{gathered}
\end{equation}
The angle $\theta$ is randomly generated in the interval $[-\pi, \pi]$. The quaternion $q_{imag}^\triangleleft$ is defined as purely normalized imaginary, and is expressed as $q_{imag}^\triangleleft=0+x\textbf{i}+y\textbf{j}+z\textbf{k}$. The imaginary components x\textbf{i}, y\textbf{j}, and z\textbf{k} are sampled from an uniform distribution in $[0,1]$ to obtain $q_{imag}$, which is then normalized (following Eq. \ref{eq:normalize}) to obtain $q_{imag}^\triangleleft$. The parameter $\varphi$ is a random number generated with respect to well-known initialization criterions (such as Glorot or He algorithms) \citep{glorot2010understanding,he2015delving}. However, the equations derived in \citep{glorot2010understanding,he2015delving} are defined for real-valued weight matrices. Therefore, the variance of $W$ has to be investigated in the quaternion space to obtain $\varphi$ (the full demonstration is provided in Appendix \ref{app:init}). The variance of $W$ is:
\begin{align}
	Var(W) = \mathbb{E}(|W|^2) -  [\mathbb{E}(|W|)]^2,\ \text{with}\
	[\mathbb{E}(|W|)]^2 = 0.
\end{align}
Indeed, the weight distribution is normalized. The value of $Var(W) = \mathbb{E}(|W|^2)$, instead, is not trivial in the case of quaternion-valued matrices. Indeed, $W$ follows a Chi-distribution with four degrees of freedom (DOFs). Consequently, $Var(W)$ is expressed and computed as follows:
\begin{align}
\label{eq:var}
	Var(W) = \mathbb{E}(|W|^2) =\int_{0}^{\infty} x^2f(x) \, \mathrm{d}x=4\sigma^2.
\end{align}
The Glorot \citep{glorot2010understanding} and He \citep{he2015delving} criterions are extended to quaternion as:
\begin{align}
\label{eq:qinit}
\sigma = \frac{1}{\sqrt[]{2(n_{in} + n_{out})}}, \ \text{and} \ \sigma = \frac{1}{\sqrt[]{2n_{in}}},
\end{align}
with $n_{in}$ and $n_{out}$ the number of neurons of the input and output layers respectively. Finally, $\varphi$ can be sampled from $[-\sigma, \sigma]$ to complete the weight initialization of Eq. \ref{eq:weight}.

\begin{algorithm}[t]
\label{algo:1}
    \caption{Quaternion-valued weight initialization}
    \label{euclid}
    \begin{algorithmic}[1] % The number tells where the line numbering should start
        \Procedure{Qinit}{$W, n_{in}, n_{out}$} 
        \State $\sigma \gets \frac{1}{\sqrt{2(n_{in}+n_{out})}}$ \Comment{\textit{w.r.t to Glorot criterion and Eq. \ref{eq:qinit}}}
        \For{\texttt{$w$ in $W$}}
            \State $\theta \gets rand(-\pi, \pi)$
            \State $\varphi \gets rand(-\sigma, \sigma)$
            \State $x,y,z \gets rand(0,1)$
            \State $q_{imag} \gets Quaternion(0,x,y,z)$
            \State $q_{imag}^\triangleleft \gets \frac{q_{imag}}{\sqrt{x^2+y^2+z^2}}$
            \State $w_r \gets \varphi \times cos(\theta)$            \Comment{\textit{See Eq. \ref{eq:weight}}}
            \State $w_i \gets \varphi \times q_{imag_i}^\triangleleft \times sin(\theta)$ 
            \State $w_j \gets \varphi \times q_{imag_j}^\triangleleft \times sin(\theta)$
            \State $w_k \gets \varphi \times q_{imag_k}^\triangleleft \times sin(\theta)$
            \State $w \gets Quaternion(w_r,w_i,w_j,w_k)$
        \EndFor  
        \EndProcedure
    \end{algorithmic}
\end{algorithm}



%
% EXPERIMENTS
%
\section{Experiments}

This Section details the acoustic features extraction (Section \ref{subsec:acc}), the experimental setups and the results obtained with QRNNs, QLSTMs, RNNs and LSTMs on the TIMIT  speech recognition tasks (Section \ref{subsec:results}). The results reported in bold on tables are obtained with the best configurations of the neural networks observed with the validation set. 


%
% ACOUSTIC FEATURES
%
\subsection{Quaternion acoustic features}
\label{subsec:acc}

The raw audio is first splitted every $10$ms with a window of $25$ms. Then $40$-dimensional log Mel-filter-bank coefficients with first, second, and third order derivatives are extracted using the \textit{pytorch-kaldi}\footnote{pytorch-kaldi is available at \url{https://github.com/mravanelli/pytorch-kaldi}} \citep{mirco2018pykaldi} toolkit and the Kaldi s5 recipes \citep{Povey_ASRU2011}. An acoustic quaternion $Q(f,t)$ associated with a frequency $f$ and a time-frame $t$ is formed as follows:
\begin{align}
Q(f,t) = e(f,t) + \frac{\partial e(f,t)}{\partial t}\textbf{i} + \frac{\partial^2 e(f,t)}{\partial^2 t} \textbf{j} + \frac{\partial^3 e(f,t)}{\partial^3 t} \textbf{k}.
\end{align}
$Q(f,t)$ represents multiple views of a frequency $f$ at time frame $t$, consisting of the energy $e(f,t)$ in the filter band at frequency $f$, its first time derivative describing a slope view, its second time derivative describing a concavity view, and the third derivative describing the rate of change of the second derivative. Quaternions are used to learn the spatial relations that exist between the $3$ described different views that characterize a same frequency \citep{tokuda2003trajectory}. Thus, the quaternion input vector length is $160/4 = 40$. Decoding is based on Kaldi \citep{Povey_ASRU2011} and weighted finite state transducers (WFST) \citep{MOHRI200269} that integrate acoustic, lexicon and language model probabilities into a single HMM-based search graph.


%
% TIMIT
%
\subsection{The TIMIT corpus}
\label{subsec:results}

The training process is based on the standard $3,696$ sentences uttered by $462$ speakers, while testing is conducted on $192$ sentences uttered by $24$ speakers of the TIMIT \citep{garofolo1993darpa} dataset. A validation set composed of $400$ sentences uttered by $50$ speakers is used for hyper-parameter tuning. The models are compared on a fixed number of layers $M=4$ and by varying the number of neurons $N$ from $256$ to $2,048$, and $64$ to $512$ for the RNN and QRNN respectively. Indeed, it is worth underlying that the number of hidden neurons in the quaternion and real spaces do not handle the same amount of real-number values. Indeed, $256$ quaternion neurons output are $256\times4=1024$ real values. Tanh activations are used across all the layers except for the output layer that is based on a softmax function. Models are optimized with RMSPROP with vanilla hyper-parameters and an initial learning rate of $8\cdot10^{-4}$. The learning rate is progressively annealed using a halving factor of $0.5$ that is applied when no performance improvement on the validation set is observed. The models are trained during $25$ epochs. All the models converged to a minimum loss, due to the annealed learning rate. A dropout rate of $0.2$ is applied over all the hidden layers \citep{srivastava2014dropout} except the output one. The negative log-likelihood loss function is used as an objective function. All the experiments are repeated $5$ times (5-folds) with different seeds and are averaged to limit any variation due to the random initialization. 

\begin{table}[!h]

    \caption{Phoneme error rate (PER\%) of QRNN and RNN models on the development and test sets of the TIMIT dataset. “Params" stands for the total number of trainable parameters.}
        \centering
        \scalebox{0.75}{
        \begin{tabular}{ P{1.3cm}P{1.3cm}  P{1cm} P{1cm}  P{1.3cm}}
           \hline\hline
            \textbf{Models}& \textbf{Neurons}&\textbf{Dev.}& \textbf{Test}& \textbf{Params}\\
            \hline
        
            \multirow{4}*{RNN}  & 256  & 22.4  & 23.4 & 1M \\
                                & 512  & 19.6  & 20.4 & 2.8M \\
           	                    & \textbf{1,024} & \textbf{17.9}  & \textbf{19.0} & \textbf{9.4M} \\
                                & 2,048 & 20.0  & 20.7 & 33.4M \\
           	\hline
           	\multirow{4}*{QRNN} & 64  & 23.6 & 23.9  &  0.6M \\
                                & 128 & 19.2 & 20.1  &  1.4M \\
           	                    & \textbf{256} & \textbf{17.4} & \textbf{18.5}  &  \textbf{3.8M} \\
                                & 512 & 17.5 & 18.7  & 11.2M \\
           	\hline
        \end{tabular}
        \label{table:timit1}
        }
\end{table}

The results on the TIMIT task are reported in Table \ref{table:timit1}. The best PER in realistic conditions (w.r.t to the best validation PER) is $18.5\%$ and $19.0\%$ on the test set for QRNN and RNN models respectively, highlighting an absolute improvement of $0.5\%$ obtained with QRNN. These results compare favorably with the best results obtained so far with architectures that do not integrate access control in multiple memory layers \citep{ravanelli2018light}. In the latter, a PER of $18.3$\% is reported on the TIMIT test set with batch-normalized RNNs . Moreover, a remarkable advantage of QRNNs is a drastic reduction (with a factor of $2.5\times$) of the parameters needed to achieve these results. Indeed, such PERs are obtained with models that employ the same internal dimensionality corresponding to $1,024$ real-valued neurons and $256$ quaternion-valued ones, resulting in a number of parameters of $3.8$M for QRNN against the $9.4$M used in the real-valued RNN. It is also worth noting that QRNNs consistently need fewer parameters than equivalently sized RNNs, with an average reduction factor of $2.26$ times. This is easily explained by considering the content of the quaternion algebra. Indeed, for a fully-connected layer with $2,048$ input values and $2,048$ hidden units, a real-valued RNN has $2,048^2\approx4.2$M parameters, while to maintain equal input and output dimensions the quaternion equivalent has $512$ quaternions inputs and $512$ quaternion hidden units. Therefore, the number of parameters for the quaternion-valued model is $512^2\times4\approx1$M. Such a complexity reduction turns out to produce better results and has other advantages such as a smaller memory footprint while saving models on budget memory systems. This characteristic makes our QRNN model particularly suitable for speech recognition conducted on low computational power devices like smartphones \citep{6854370}. QRNNs and RNNs accuracies vary accordingly to the architecture with better PER on bigger and wider topologies. Therefore, while good PER are observed with a higher number of parameters, smaller architectures performed at $23.9\%$ and $23.4\%$, with $1$M and $0.6$M parameters for the RNN and the QRNN respectively. Such PER are due to a too small number of parameters to solve the task.


%
% QLSTM
%
\subsection{Quaternion long-short term memory neural networks}

We propose to extend the QRNN to state-of-the-art models such as long-short term memory neural networks (LSTM), to support and improve the results already observed with the QRNN compared to the RNN in more realistic conditions. LSTM \citep{hochreiter1997long} neural networks were introduced to solve the problems of long-term dependencies learning and vanishing or exploding gradient observed with long sequences. Based on the equations of the forward propagation and back propagation through time of QRNN described in Section \ref{subsec:forward}, and Section \ref{subsec:bptt}, one can easily derive the equations of a quaternion-valued LSTM. Gates are defined with quaternion numbers following the proposal of \cite{danihelka2016associative}. Therefore, the gate action is characterized by an independent modification of each component of the quaternion-valued signal following a component-wise product with the quaternion-valued gate potential. Let $f_t$,$i_t$, $o_t$, $c_t$, and $h_t$ be the forget, input, output gates, cell states and the hidden state of a LSTM cell at time-step $t$:

\begin{align}
    f_t =& \alpha(W_{f} \otimes x_t + R_{f} \otimes h_{t-1} + b_f),\\
    i_t =& \alpha(W_{i} \otimes x_t + R_{i} \otimes h_{t-1} + b_i),\\
    c_t =& f_t\times c_{t-1} + i_t\times tanh(W_{c}x_t + R_{c}h_{t-1} + b_c),\\
    o_t =& \alpha(W_{o} \otimes x_t + R_{o} \otimes h_{t-1} + b_o),\\
    h_t =& o_t \times tanh(c_t),
\end{align}

where $W$ are rectangular input weight matrices, $R$ are square recurrent weight matrices, and $b$ are bias vectors. $\alpha$ is the split activation function and $\times$ denotes a component-wise product between two quaternions. Both QLSTM and LSTM are bidirectional and trained on the same conditions than for the QRNN and RNN experiments. 

\begin{table}[h!]
\centering
\caption{Phoneme error rate (PER\%) of QLSTM and LSTM models on the development and test sets of the TIMIT dataset. “Params" stands for the total number of trainable parameters.}
\scalebox{0.75}{
    \begin{tabular}{ P{1.3cm}P{1.3cm} P{1cm}  P{1cm}   P{1.3cm}}
        \hline\hline
        \textbf{Models}& \textbf{Neurons}&\textbf{Dev.}& \textbf{Test}& \textbf{Params}\\
        \hline
        
        \multirow{4}*{LSTM}  & 256 & 14.9  & 16.5 & 3.6M \\
                                & 512 & 14.2 & 16.1 & 12.6M \\
           	                    & \textbf{1,024} & \textbf{14.4} & \textbf{15.3} & \textbf{46.2M}  \\
                                & 2,048 & 14.0 & 15.9 &  176.3M \\
        \hline
        \multirow{4}*{QLSTM} & 64 &  15.5  & 17.0 & 1.6M \\
                                & 128 & 14.1 & 16.0 & 4.6M \\
           	                    & \textbf{256} & \textbf{14.0} & \textbf{15.1} & \textbf{14.4M} \\
                                & 512 & 14.2 & 15.1 & 49.9M  \\
        \hline
    \end{tabular}
    \label{table:timit2}
}
\end{table}

The results on the TIMIT corpus reported on Table \ref{table:timit2} support the initial intuitions and the previously established trends. We first point out that the best PER observed is $15.1\%$ and $15.3\%$ on the test set for QLSTMs and LSTM models respectively with an absolute improvement of $0.2\%$ obtained with QLSTM using $3.3$ times fewer parameters compared to LSTM. These results are among the top of the line results \citep{graves2013speech,ravanelli2018light} and prove that the proposed quaternion approach can be used in state-of-the-art models. A deeper investigation of QLSTMs performances with the larger Wall Street Journal (WSJ) dataset can be found in Appendix \ref{app:WSJ}.


%
% Conclusion
%
\section{Conclusion}
\label{sec:conclusion}

\textbf{Summary}.
This paper proposes to process sequences of multidimensional features (such as acoustic data) with a novel quaternion recurrent neural network (QRNN) and quaternion long-short term memory neural network (QLSTM). The experiments conducted on the TIMIT phoneme recognition task show that QRNNs and QLSTMs are more effective to learn a compact representation of multidimensional information by outperforming RNNs and LSTMs with $2$ to $3$ times less free parameters. Therefore, our initial intuition that the quaternion algebra offers a better and more compact representation for multidimensional features, alongside with a better learning capability of feature internal dependencies through the \textit{Hamilton product}, have been demonstrated.\\ 

\textbf{Future Work}.
Future investigations will develop other multi-view features that contribute to decrease ambiguities in representing phonemes in the quaternion space. In this extent, a recent approach based on a quaternion Fourier transform to create quaternion-valued signal has to be investigated. Finally, other high-dimensional neural networks such as manifold and Clifford networks remain mostly unexplored and can benefit from further research. \\


%
% ACKNOWLEGMENTS
%
%\subsubsection*{Acknowledgments}
%The authors would like to acknowledge the founding support of Orkis, the computing support of Compute Canada and, NSERC, Samsung, IBM and CHIST-ERA/FRQ. 

%\section*{References}

\bibliographystyle{iclr2019_conference}

%\bibliography{strings}

\begin{thebibliography}{51}
\providecommand{\natexlab}[1]{#1}
\providecommand{\url}[1]{\texttt{#1}}
\expandafter\ifx\csname urlstyle\endcsname\relax
  \providecommand{\doi}[1]{doi: #1}\else
  \providecommand{\doi}{doi: \begingroup \urlstyle{rm}\Url}\fi

\bibitem[Amodei et~al.(2016)Amodei, Ananthanarayanan, Anubhai, Bai, Battenberg,
  Case, Casper, Catanzaro, Cheng, Chen, et~al.]{amodei2016deep}
Dario Amodei, Sundaram Ananthanarayanan, Rishita Anubhai, Jingliang Bai, Eric
  Battenberg, Carl Case, Jared Casper, Bryan Catanzaro, Qiang Cheng, Guoliang
  Chen, et~al.
\newblock Deep speech 2: End-to-end speech recognition in english and mandarin.
\newblock In \emph{International Conference on Machine Learning}, pp.\
  173--182, 2016.

\bibitem[Arena et~al.(1994)Arena, Fortuna, Occhipinti, and
  Xibilia]{arena1994neural}
Paolo Arena, Luigi Fortuna, Luigi Occhipinti, and Maria~Gabriella Xibilia.
\newblock Neural networks for quaternion-valued function approximation.
\newblock In \emph{Circuits and Systems, ISCAS'94., IEEE International
  Symposium on}, volume~6, pp.\  307--310. IEEE, 1994.

\bibitem[Arena et~al.(1997)Arena, Fortuna, Muscato, and
  Xibilia]{arena1997multilayer}
Paolo Arena, Luigi Fortuna, Giovanni Muscato, and Maria~Gabriella Xibilia.
\newblock Multilayer perceptrons to approximate quaternion valued functions.
\newblock \emph{Neural Networks}, 10\penalty0 (2):\penalty0 335--342, 1997.

\bibitem[Aspragathos \& Dimitros(1998)Aspragathos and
  Dimitros]{aspragathos1998comparative}
Nicholas~A Aspragathos and John~K Dimitros.
\newblock A comparative study of three methods for robot kinematics.
\newblock \emph{Systems, Man, and Cybernetics, Part B: Cybernetics, IEEE
  Transactions on}, 28\penalty0 (2):\penalty0 135--145, 1998.

\bibitem[Chakraborty et~al.(2018)Chakraborty, Bouza, Manton, and
  C.~Vemuri]{chakra2018mani}
Rudrasis Chakraborty, Jose Bouza, Jonathan Manton, and Baba C.~Vemuri.
\newblock Manifoldnet: A deep network framework for manifold-valued data.
\newblock \emph{arXiv preprint arXiv:1809.06211}, 2018.

\bibitem[Chan \& Lane(2015)Chan and Lane]{chan2015deep}
William Chan and Ian Lane.
\newblock Deep recurrent neural networks for acoustic modelling.
\newblock \emph{arXiv preprint arXiv:1504.01482}, 2015.

\bibitem[Chen et~al.(2014)Chen, Parada, and Heigold]{6854370}
G.~Chen, C.~Parada, and G.~Heigold.
\newblock Small-footprint keyword spotting using deep neural networks.
\newblock In \emph{2014 IEEE International Conference on Acoustics, Speech and
  Signal Processing (ICASSP)}, pp.\  4087--4091, May 2014.
\newblock \doi{10.1109/ICASSP.2014.6854370}.

\bibitem[Chiu et~al.(2018)Chiu, Sainath, Wu, Prabhavalkar, Nguyen, Chen,
  Kannan, Weiss, Rao, Gonina, et~al.]{chiu2018state}
Chung-Cheng Chiu, Tara~N Sainath, Yonghui Wu, Rohit Prabhavalkar, Patrick
  Nguyen, Zhifeng Chen, Anjuli Kannan, Ron~J Weiss, Kanishka Rao, Ekaterina
  Gonina, et~al.
\newblock State-of-the-art speech recognition with sequence-to-sequence models.
\newblock In \emph{2018 IEEE International Conference on Acoustics, Speech and
  Signal Processing (ICASSP)}, pp.\  4774--4778. IEEE, 2018.

\bibitem[Conneau et~al.(2018)Conneau, Kruszewski, Lample, Barrault, and
  Baroni]{conneau2018}
Alexis Conneau, German Kruszewski, Guillaume Lample, Loïc Barrault, and Marco
  Baroni.
\newblock What you can cram into a single vector: Probing sentence embeddings
  for linguistic properties, 2018.

\bibitem[Danihelka et~al.(2016)Danihelka, Wayne, Uria, Kalchbrenner, and
  Graves]{danihelka2016associative}
Ivo Danihelka, Greg Wayne, Benigno Uria, Nal Kalchbrenner, and Alex Graves.
\newblock Associative long short-term memory.
\newblock \emph{arXiv preprint arXiv:1602.03032}, 2016.

\bibitem[Davis \& Mermelstein(1990)Davis and Mermelstein]{davis1990comparison}
Steven~B Davis and Paul Mermelstein.
\newblock Comparison of parametric representations for monosyllabic word
  recognition in continuously spoken sentences.
\newblock In \emph{Readings in speech recognition}, pp.\  65--74. Elsevier,
  1990.

\bibitem[Furui(1986)]{furui1986speaker}
Sadaoki Furui.
\newblock Speaker-independent isolated word recognition based on emphasized
  spectral dynamics.
\newblock In \emph{Acoustics, Speech, and Signal Processing, IEEE International
  Conference on ICASSP'86.}, volume~11, pp.\  1991--1994. IEEE, 1986.

\bibitem[Garofolo et~al.(1993)Garofolo, Lamel, Fisher, Fiscus, and
  Pallett]{garofolo1993darpa}
John~S Garofolo, Lori~F Lamel, William~M Fisher, Jonathan~G Fiscus, and David~S
  Pallett.
\newblock Darpa timit acoustic-phonetic continous speech corpus cd-rom. nist
  speech disc 1-1.1.
\newblock \emph{NASA STI/Recon technical report n}, 93, 1993.

\bibitem[Gaudet \& Maida(2018)Gaudet and Maida]{chase2017quat}
Chase~J Gaudet and Anthony~S Maida.
\newblock Deep quaternion networks.
\newblock In \emph{2018 International Joint Conference on Neural Networks
  (IJCNN)}, pp.\  1--8. IEEE, 2018.

\bibitem[Glorot \& Bengio(2010)Glorot and Bengio]{glorot2010understanding}
Xavier Glorot and Yoshua Bengio.
\newblock Understanding the difficulty of training deep feedforward neural
  networks.
\newblock In \emph{International conference on artificial intelligence and
  statistics}, pp.\  249--256, 2010.

\bibitem[Graves et~al.(2013{\natexlab{a}})Graves, Jaitly, and
  Mohamed]{graves2013hybrid}
Alex Graves, Navdeep Jaitly, and Abdel-rahman Mohamed.
\newblock Hybrid speech recognition with deep bidirectional lstm.
\newblock In \emph{Automatic Speech Recognition and Understanding (ASRU), 2013
  IEEE Workshop on}, pp.\  273--278. IEEE, 2013{\natexlab{a}}.

\bibitem[Graves et~al.(2013{\natexlab{b}})Graves, Mohamed, and
  Hinton]{graves2013speech}
Alex Graves, Abdel-rahman Mohamed, and Geoffrey Hinton.
\newblock Speech recognition with deep recurrent neural networks.
\newblock In \emph{Acoustics, speech and signal processing (icassp), 2013 ieee
  international conference on}, pp.\  6645--6649. IEEE, 2013{\natexlab{b}}.

\bibitem[He et~al.(2015)He, Zhang, Ren, and Sun]{he2015delving}
Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
\newblock Delving deep into rectifiers: Surpassing human-level performance on
  imagenet classification.
\newblock In \emph{Proceedings of the IEEE international conference on computer
  vision}, pp.\  1026--1034, 2015.

\bibitem[Hirose \& Yoshida(2012)Hirose and Yoshida]{hirose2012generalization}
Akira Hirose and Shotaro Yoshida.
\newblock Generalization characteristics of complex-valued feedforward neural
  networks in relation to signal coherence.
\newblock \emph{IEEE Transactions on Neural Networks and learning systems},
  23\penalty0 (4):\penalty0 541--551, 2012.

\bibitem[Hochreiter \& Schmidhuber(1997)Hochreiter and
  Schmidhuber]{hochreiter1997long}
Sepp Hochreiter and J{\"u}rgen Schmidhuber.
\newblock Long short-term memory.
\newblock \emph{Neural computation}, 9\penalty0 (8):\penalty0 1735--1780, 1997.

\bibitem[Hu \& Wang(2012)Hu and Wang]{hu2012global}
Jin Hu and Jun Wang.
\newblock Global stability of complex-valued recurrent neural networks with
  time-delays.
\newblock \emph{IEEE Transactions on Neural Networks and Learning Systems},
  23\penalty0 (6):\penalty0 853--865, 2012.

\bibitem[Isokawa et~al.(2003)Isokawa, Kusakabe, Matsui, and
  Peper]{isokawa2003quaternion}
Teijiro Isokawa, Tomoaki Kusakabe, Nobuyuki Matsui, and Ferdinand Peper.
\newblock Quaternion neural network and its application.
\newblock In \emph{International Conference on Knowledge-Based and Intelligent
  Information and Engineering Systems}, pp.\  318--324. Springer, 2003.

\bibitem[Isokawa et~al.(2009)Isokawa, Matsui, and
  Nishimura]{isokawa2009quaternionic}
Teijiro Isokawa, Nobuyuki Matsui, and Haruhiko Nishimura.
\newblock Quaternionic neural networks: Fundamental properties and
  applications.
\newblock \emph{Complex-Valued Neural Networks: Utilizing High-Dimensional
  Parameters}, pp.\  411--439, 2009.

\bibitem[Kingma \& Ba(2014)Kingma and Ba]{kingma2014adam}
Diederik Kingma and Jimmy Ba.
\newblock Adam: A method for stochastic optimization.
\newblock \emph{arXiv preprint arXiv:1412.6980}, 2014.

\bibitem[Kusamichi et~al.(2004)Kusamichi, Isokawa, Matsui, Ogawa, and
  Maeda]{kusamichi2004new}
Hiromi Kusamichi, Teijiro Isokawa, Nobuyuki Matsui, Yuzo Ogawa, and Kazuaki
  Maeda.
\newblock A new scheme for color night vision by quaternion neural network.
\newblock In \emph{Proceedings of the 2nd International Conference on
  Autonomous Robots and Agents}, volume 1315, 2004.

\bibitem[Matsui et~al.(2004)Matsui, Isokawa, Kusamichi, Peper, and
  Nishimura]{matsui2004quaternion}
Nobuyuki Matsui, Teijiro Isokawa, Hiromi Kusamichi, Ferdinand Peper, and
  Haruhiko Nishimura.
\newblock Quaternion neural network with geometrical operators.
\newblock \emph{Journal of Intelligent \& Fuzzy Systems}, 15\penalty0 (3,
  4):\penalty0 149--164, 2004.

\bibitem[Medsker \& Jain(2001)Medsker and Jain]{medsker2001recurrent}
Larry~R. Medsker and Lakhmi~J. Jain.
\newblock Recurrent neural networks.
\newblock \emph{Design and Applications}, 5, 2001.

\bibitem[Minemoto et~al.(2017)Minemoto, Isokawa, Nishimura, and
  Matsui]{minemoto2017feed}
Toshifumi Minemoto, Teijiro Isokawa, Haruhiko Nishimura, and Nobuyuki Matsui.
\newblock Feed forward neural network with random quaternionic neurons.
\newblock \emph{Signal Processing}, 136:\penalty0 59--68, 2017.

\bibitem[Mohri et~al.(2002)Mohri, Pereira, and Riley]{MOHRI200269}
Mehryar Mohri, Fernando Pereira, and Michael Riley.
\newblock Weighted finite-state transducers in speech recognition.
\newblock \emph{Computer Speech and Language}, 16\penalty0 (1):\penalty0 69 --
  88, 2002.
\newblock ISSN 0885-2308.
\newblock \doi{https://doi.org/10.1006/csla.2001.0184}.
\newblock URL
  \url{http://www.sciencedirect.com/science/article/pii/S0885230801901846}.

\bibitem[Morchid(2018)]{morchid2018parsimonious}
Mohamed Morchid.
\newblock Parsimonious memory unit for recurrent neural networks with
  application to natural language processing.
\newblock \emph{Neurocomputing}, 314:\penalty0 48--64, 2018.

\bibitem[Nitta(1995)]{nitta1995quaternary}
Tohru Nitta.
\newblock A quaternary version of the back-propagation algorithm.
\newblock In \emph{Neural Networks, 1995. Proceedings., IEEE International
  Conference on}, volume~5, pp.\  2753--2756. IEEE, 1995.

\bibitem[Parcollet et~al.(2016)Parcollet, Morchid, Bousquet, Dufour,
  Linar{\`e}s, and De~Mori]{parcollet2016quaternion}
Titouan Parcollet, Mohamed Morchid, Pierre-Michel Bousquet, Richard Dufour,
  Georges Linar{\`e}s, and Renato De~Mori.
\newblock Quaternion neural networks for spoken language understanding.
\newblock In \emph{Spoken Language Technology Workshop (SLT), 2016 IEEE}, pp.\
  362--368. IEEE, 2016.

\bibitem[Parcollet et~al.(2017{\natexlab{a}})Parcollet, Mohamed, and
  Linarès]{parcollet2017quaternion}
Titouan Parcollet, Morchid Mohamed, and Georges Linarès.
\newblock Quaternion denoising encoder-decoder for theme identification of
  telephone conversations.
\newblock \emph{Proc. Interspeech 2017}, pp.\  3325--3328, 2017{\natexlab{a}}.

\bibitem[Parcollet et~al.(2017{\natexlab{b}})Parcollet, Morchid, and
  Linares]{parcollet2017deep}
Titouan Parcollet, Mohamed Morchid, and Georges Linares.
\newblock Deep quaternion neural networks for spoken language understanding.
\newblock In \emph{Automatic Speech Recognition and Understanding Workshop
  (ASRU), 2017 IEEE}, pp.\  504--511. IEEE, 2017{\natexlab{b}}.

\bibitem[Parcollet et~al.(2018)Parcollet, Zhang, Morchid, Trabelsi,
  Linar{\`{e}}s, de~Mori, and Bengio]{parcollet2018qcnn}
Titouan Parcollet, Ying Zhang, Mohamed Morchid, Chiheb Trabelsi, Georges
  Linar{\`{e}}s, Renato de~Mori, and Yoshua Bengio.
\newblock Quaternion convolutional neural networks for end-to-end automatic
  speech recognition.
\newblock In \emph{Interspeech 2018, 19th Annual Conference of the
  International Speech Communication Association, Hyderabad, India, 2-6
  September 2018.}, pp.\  22--26, 2018.
\newblock \doi{10.21437/Interspeech.2018-1898}.
\newblock URL \url{https://doi.org/10.21437/Interspeech.2018-1898}.

\bibitem[Pei \& Cheng(1999)Pei and Cheng]{pei1999color}
Soo-Chang Pei and Ching-Min Cheng.
\newblock Color image processing by using binary quaternion-moment-preserving
  thresholding technique.
\newblock \emph{IEEE Transactions on Image Processing}, 8\penalty0
  (5):\penalty0 614--628, 1999.

\bibitem[Povey et~al.(2011)Povey, Ghoshal, Boulianne, Burget, Glembek, Goel,
  Hannemann, Motlicek, Qian, Schwarz, Silovsky, Stemmer, and
  Vesely]{Povey_ASRU2011}
Daniel Povey, Arnab Ghoshal, Gilles Boulianne, Lukas Burget, Ondrej Glembek,
  Nagendra Goel, Mirko Hannemann, Petr Motlicek, Yanmin Qian, Petr Schwarz, Jan
  Silovsky, Georg Stemmer, and Karel Vesely.
\newblock The kaldi speech recognition toolkit.
\newblock In \emph{IEEE 2011 Workshop on Automatic Speech Recognition and
  Understanding}. IEEE Signal Processing Society, December 2011.
\newblock IEEE Catalog No.: CFP11SRW-USB.

\bibitem[Povey et~al.(2016)Povey, Peddinti, Galvez, Ghahremani, Manohar, Na,
  Wang, and Khudanpur]{povey2016purely}
Daniel Povey, Vijayaditya Peddinti, Daniel Galvez, Pegah Ghahremani, Vimal
  Manohar, Xingyu Na, Yiming Wang, and Sanjeev Khudanpur.
\newblock Purely sequence-trained neural networks for asr based on lattice-free
  mmi.
\newblock In \emph{Interspeech}, pp.\  2751--2755, 2016.

\bibitem[Ravanelli et~al.(2018{\natexlab{a}})Ravanelli, Brakel, Omologo, and
  Bengio]{ravanelli2018light}
Mirco Ravanelli, Philemon Brakel, Maurizio Omologo, and Yoshua Bengio.
\newblock Light gated recurrent units for speech recognition.
\newblock \emph{IEEE Transactions on Emerging Topics in Computational
  Intelligence}, 2\penalty0 (2):\penalty0 92--102, 2018{\natexlab{a}}.

\bibitem[Ravanelli et~al.(2018{\natexlab{b}})Ravanelli, Parcollet, and
  Bengio]{mirco2018pykaldi}
Mirco Ravanelli, Titouan Parcollet, and Yoshua Bengio.
\newblock The pytorch-kaldi speech recognition toolkit.
\newblock \emph{arXiv preprint arXiv:1811.07453}, 2018{\natexlab{b}}.

\bibitem[Sabour et~al.(2017)Sabour, Frosst, and Hinton]{hinton2017capsule}
Sara Sabour, Nicholas Frosst, and Geoffrey~E Hinton.
\newblock Dynamic routing between capsules.
\newblock \emph{arXiv preprint arXiv:1710.09829v2}, 2017.

\bibitem[Sangwine(1996)]{sangwine1996fourier}
Stephen~John Sangwine.
\newblock Fourier transforms of colour images using quaternion or hypercomplex,
  numbers.
\newblock \emph{Electronics letters}, 32\penalty0 (21):\penalty0 1979--1980,
  1996.

\bibitem[Song \& Yam(1998)Song and Yam]{song1998complex}
Jingyan Song and Yeung Yam.
\newblock Complex recurrent neural network for computing the inverse and
  pseudo-inverse of the complex matrix.
\newblock \emph{Applied mathematics and computation}, 93\penalty0
  (2-3):\penalty0 195--205, 1998.

\bibitem[Srivastava et~al.(2014)Srivastava, Hinton, Krizhevsky, Sutskever, and
  Salakhutdinov]{srivastava2014dropout}
Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, Ilya Sutskever, and Ruslan
  Salakhutdinov.
\newblock Dropout: A simple way to prevent neural networks from overfitting.
\newblock \emph{The Journal of Machine Learning Research}, 15\penalty0
  (1):\penalty0 1929--1958, 2014.

\bibitem[Sutskever et~al.(2013)Sutskever, Martens, Dahl, and
  Hinton]{sutskever2013importance}
Ilya Sutskever, James Martens, George Dahl, and Geoffrey Hinton.
\newblock On the importance of initialization and momentum in deep learning.
\newblock In \emph{International conference on machine learning}, pp.\
  1139--1147, 2013.

\bibitem[Tokuda et~al.(2003)Tokuda, Zen, and Kitamura]{tokuda2003trajectory}
Keiichi Tokuda, Heiga Zen, and Tadashi Kitamura.
\newblock Trajectory modeling based on hmms with the explicit relationship
  between static and dynamic features.
\newblock In \emph{Eighth European Conference on Speech Communication and
  Technology}, 2003.

\bibitem[Trabelsi et~al.(2017)Trabelsi, Bilaniuk, Serdyuk, Subramanian, Santos,
  Mehri, Rostamzadeh, Bengio, and Pal]{chiheb2017complex}
Chiheb Trabelsi, Olexa Bilaniuk, Dmitriy Serdyuk, Sandeep Subramanian,
  João~Felipe Santos, Soroush Mehri, Negar Rostamzadeh, Yoshua Bengio, and
  Christopher~J Pal.
\newblock Deep complex networks.
\newblock \emph{arXiv preprint arXiv:1705.09792}, 2017.

\bibitem[Tripathi(2016)]{tripathi2016high}
Bipin~Kumar Tripathi.
\newblock \emph{High Dimensional Neurocomputing}.
\newblock Springer, 2016.

\bibitem[Tygert et~al.(2016)Tygert, Bruna, Chintala, LeCun, Piantino, and
  Szlam]{tygert2016mathematical}
Mark Tygert, Joan Bruna, Soumith Chintala, Yann LeCun, Serkan Piantino, and
  Arthur Szlam.
\newblock A mathematical motivation for complex-valued convolutional networks.
\newblock \emph{Neural computation}, 28\penalty0 (5):\penalty0 815--825, 2016.

\bibitem[Wisdom et~al.(2016)Wisdom, Powers, Hershey, Le~Roux, and
  Atlas]{wisdom2016full}
Scott Wisdom, Thomas Powers, John Hershey, Jonathan Le~Roux, and Les Atlas.
\newblock Full-capacity unitary recurrent neural networks.
\newblock In \emph{Advances in Neural Information Processing Systems}, pp.\
  4880--4888, 2016.

\bibitem[Xu et~al.(2017)Xu, Zhang, and Zhang]{xu2017learning}
D~Xu, L~Zhang, and H~Zhang.
\newblock Learning alogrithms in quaternion neural networks using ghr calculus.
\newblock \emph{Neural Network World}, 27\penalty0 (3):\penalty0 271, 2017.

\end{thebibliography}


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% APPENDIX
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



\newpage
\section{Appendix}
\label{sec:apendix}

\subsection{Wall Street Journal experiments and computational complexity}
\label{app:adding}

This Section proposes to validate the scaling of the proposed QLSTMs to a bigger and more realistic corpus, with a speech recognition task on the Wall Street Journal (WSJ) dataset. Finally, it discuses the impact of the quaternion algebra in term of computational compexity.

\subsubsection{Speech recognition with the Wall Street Journal corpus}
\label{app:WSJ}

We propose to evaluate both QLSTMs and LSTMs with a larger and more realistic corpus to validate the scaling of the observed TIMIT results (Section \ref{subsec:results}). Acoustic input features are described in Section \ref{subsec:acc}, and extracted on both the $14$ hour subset ‘train-si84’, and the full $81$ hour dataset 'train-si284' of the Wall Street Journal (WSJ) corpus. The ‘test-dev93’ development set is employed for validation, while 'test-eval92' composes the testing set. Models architectures are fixed with respect to the best results observed with the TIMIT corpus (Section \ref{subsec:results}). Therefore, both QLSTMs and LSTMs contain four bidirectional layers of internal dimension of size $1,024$. Then, an additional layer of internal size $1,024$ is added before the output layer. The only change on the training procedure compared to the TIMIT experiments concerns the model optimizer, which is set to Adam \citep{kingma2014adam} instead of RMSPROP. Results are from a $3$-folds average.

\begin{table}[ht]
\caption{ Word error rates (WER \%) obtained with both training set (WSJ14h and WSJ81h) of the Wall Street Journal corpus. 'test-dev93' and 'test-eval92' are used as validation and testing set respectively. $L$ expresses the number of recurrent layers.}
\label{table:resultswsj}
\begin{center}
\scalebox{0.8}{
\begin{tabular}{P{2cm}P{1.85cm}P{1.85cm}P{1.85cm}P{1.85cm}P{1.85cm}}
    \hline\hline
    \textbf{Models} & \textbf{WSJ14 Dev.} & \textbf{WSJ14 Test} & \textbf{WSJ81 Dev.} & \textbf{WSJ81 Test} & \textbf{Params}\\
    \hline
    LSTM & 11.2 & 7.2 & 7.4 & 4.5 & 53.7M\\
    QLSTM & 10.9 & 6.9 & 7.2 & 4.3 & 18.7M\\
    \hline
\end{tabular}
}
\end{center}
\label{tab:multicol}
\end{table}

It is important to notice that reported results on Table \ref{table:resultswsj} compare favorably with equivalent architectures \citep{graves2013hybrid} (WER of $11.7\%$ on 'test-dev93'), and are competitive with state-of-the-art and much more complex models based on better engineered features \citep{chan2015deep}(WER of $3.8\%$ with the 81 hours of training data, and on 'test-eval92'). According to Table \ref{table:resultswsj}, QLSTMs outperform LSTM in all the training conditions ($14$ hours and $81$ hours) and with respect to both the validation and testing sets. Moreover, QLSTMs still need $2.9$ times less neural parameters than LSTMs to achieve such performances. This experiment demonstrates that QLSTMs scale well to larger and more realistic speech datasets and are still more efficient than real-valued LSTMs. 

\subsubsection{Notes on computational complexity}
\label{app:complexity}

A computational complexity of $O(n^2)$ with $n$ the number of hidden states has been reported by \cite{morchid2018parsimonious} for real-valued LSTMs. QLSTMs just involve $4$ times larger matrices during computations. Therefore, the computational complexity remains unchanged and equals to $O(n^2)$. Nonetheless, and due to the \textit{Hamilton product}, a single forward propagation between two quaternion neurons uses $28$ operations, compared to a single one for two real-valued neurons, implying a longer training time (up to $3$ times slower).  However, such worst speed performances could easily be alleviated with a proper engineered cuDNN kernel for the \textit{Hamilton product}, that would helps QNNs to be more efficient than real-valued ones. A well-adapted CUDA kernel would allow QNNs to perform more computations, with fewer parameters, and therefore less memory copy operations from the CPU to the GPU.   

\subsection{Parameters initialization}
\label{app:init}
Let us recall that a generated quaternion weight $w$ from a weight matrix $W$ has a polar form defined as:
\begin{align}
\centering
w=|w|e^{q_{imag}^\triangleleft\theta}=|w|(cos(\theta) + q_{imag}^\triangleleft sin(\theta)),
\end{align}
with  $q_{imag}^\triangleleft=0+x\textbf{i}+y\textbf{j}+z\textbf{k}$ a purely imaginary and normalized quaternion. Therefore, $w$ can be computed following:
\begin{equation}
    \begin{gathered}
     w_\textbf{r} = \varphi \, cos(\theta),\\
     w_\textbf{i} = \varphi \, q^\triangleleft_{imag\textbf{i}} \, sin(\theta),\\
     w_\textbf{j} = \varphi \, q^\triangleleft_{imag\textbf{j}} \, sin(\theta),\\
     w_\textbf{k} = \varphi \, q^\triangleleft_{imag\textbf{k}} \, sin(\theta).
    \end{gathered}
\end{equation}
However, $\varphi$ represents a randomly generated variable with respect to the variance of the quaternion weight and the selected initialization criterion. The initialization process follows \citep{glorot2010understanding} and \citep{he2015delving} to derive the variance of the quaternion-valued weight parameters. Indeed, the variance of $\W$ has to be investigated:
\begin{align}
	Var(W) = \mathbb{E}(|W|^2) -  [\mathbb{E}(|W|)]^2.
\end{align}
$[\mathbb{E}(|W|)]^2$ is equals to $0$ since the weight distribution is symmetric around $0$. Nonetheless, the value of $Var(W) = \mathbb{E}(|W|^2)$ is not trivial in the case of quaternion-valued matrices. Indeed, $W$ follows a Chi-distribution with four degrees of freedom (DOFs) and $\mathbb{E}(|W|^2)$ is expressed and computed as follows:
\begin{align}
	\mathbb{E}(|W|^2) =\int_{0}^{\infty} x^2f(x) \, \mathrm{d}x,
\end{align}
With $f(x)$ is the probability density function with four DOFs. A four-dimensional vector $X=\{A, B, C, D\}$ is considered to evaluate the density function $f(x)$. $X$ has components that are normally distributed, centered at zero, and independent. Then, $A$, $B$, $C$ and $D$ have density functions:
\begin{align}
f_A(x;\sigma)=f_B(x;\sigma)=f_C(x;\sigma)=f_D(x;\sigma)=\frac{e^{-x^2 / 2\sigma^2}}{\sqrt{2\pi\sigma^2}}.
\end{align}
\noindent
The four-dimensional vector $X$ has a length $L$ defined as $L=\sqrt{A^2+B^2+C^2+D^2}$ with a cumulative distribution function $F_L(x;\sigma)$ in the 4-sphere (n-sphere with $n=4$) $S_x$:
\begin{align}
	F_L(x;\sigma) = \int \int \int \int_{S_x} f_A(x;\sigma)f_B(x;\sigma)f_C(x;\sigma)f_D(x;\sigma) \, \mathrm{d}S_x \label{eq:Fcard}
\end{align}
\noindent
where $S_x=\{(a, b, c, d):\sqrt{a^2+b^2+c^2+d^2}<x\}$ and $\,\mathrm{d}S_x=\,\mathrm{d}a\,\mathrm{d}b\,\mathrm{d}c\,\mathrm{d}d$. The polar representations of the coordinates of $X$ in a 4-dimensional space are defined to compute $\,\mathrm{d}S_x$:
\begin{align}
	a&=\rho\cos\theta \nonumber,\\
	b&=\rho\sin\theta\cos\phi \nonumber,\\
	c&=\rho\sin\theta\sin\phi\cos\psi \nonumber,\\
	d&=\rho\sin\theta\sin\phi\sin\psi \nonumber,
\end{align}
where $\rho$ is the magnitude ($\rho=\sqrt{a^2+b^2+c^2+d^2}$) and $\theta$, $\phi$, and $\psi$ are the phases with $0\le \theta \le \pi$, $0\le \phi \le \pi$ and $0\le \psi \le 2\pi$. Then, $\,\mathrm{d}S_x$ is evaluated with the Jacobian $J_f$ of $f$ defined as:

\begin{align}
	J_f&=\frac{\partial (a,b,c,d)}{\partial (\rho,\theta,\phi,\psi)} = \frac{\,\mathrm{d}a\,\mathrm{d}b\,\mathrm{d}c\,\mathrm{d}d}{\,\mathrm{d}\rho\,\mathrm{d}\theta\,\mathrm{d}\phi\,\mathrm{d}\psi} %\nonumber \\
	=\begin{vmatrix}
\frac{\mathrm{d}a}{\mathrm{d}\rho} & \frac{\mathrm{d}a}{\mathrm{d}\theta} & \frac{\mathrm{d}a}{\mathrm{d}\phi} & \frac{\mathrm{d}a}{\mathrm{d}\psi} \\ 
\frac{\mathrm{d}b}{\mathrm{d}\rho} & \frac{\mathrm{d}b}{\mathrm{d}\theta} & \frac{\mathrm{d}b}{\mathrm{d}\phi} & \frac{\mathrm{d}b}{\mathrm{d}\psi} \\ 
\frac{\mathrm{d}c}{\mathrm{d}\rho} & \frac{\mathrm{d}c}{\mathrm{d}\theta} & \frac{\mathrm{d}c}{\mathrm{d}\phi} & \frac{\mathrm{d}c}{\mathrm{d}\psi} \\ 
\frac{\mathrm{d}d}{\mathrm{d}\rho} & \frac{\mathrm{d}d}{\mathrm{d}\theta} & \frac{\mathrm{d}d}{\mathrm{d}\phi} & \frac{\mathrm{d}d}{\mathrm{d}\psi} \notag
\end{vmatrix} \nonumber
\end{align}

\begingroup\makeatletter\def\f@size{10}\check@mathfonts
\def\maketag@@@#1{\hbox{\m@th\large\normalfont#1}}%
\begin{align}
	&\hspace{-3mm}=\begin{vmatrix}
\cos\theta & -\rho\sin\theta & 0 & 0 \\ 
\sin\theta\cos\phi & \rho\sin\theta\cos\phi & -\rho\sin\theta\sin\phi & 0 \\ 
\sin\theta\sin\phi\cos\psi & \rho\cos\theta\sin\phi\cos\psi & \rho\sin\theta\cos\phi\cos\psi & -\rho\sin\theta\sin\phi\sin\psi \\ 
\sin\theta\sin\phi\sin\psi & \rho\cos\theta\sin\phi\sin\psi & \rho\sin\theta\cos\phi\sin\psi & \rho\sin\theta\sin\phi\cos\psi \notag
\end{vmatrix}.
\end{align}\endgroup
And,
\begin{align}
	J_f&= \rho^3\sin^2\theta\sin\phi.
\end{align}
Therefore, by the Jacobian $J_f$, we have the polar form:
\begin{align}
	 \mathrm{d}a\,\mathrm{d}b\,\mathrm{d}c\,\mathrm{d}d&=\rho^3\sin^2\theta\sin\phi\,\mathrm{d}\rho\,\mathrm{d}\theta\,\mathrm{d}\phi\,\mathrm{d}\psi. 
\end{align}

\noindent
Then, writing Eq.(\ref{eq:Fcard}) in polar coordinates, we obtain:

\begin{align}
	F_L(x,\sigma) &= \left(\frac{1}{\sqrt{2\pi\sigma^2}}\right)^4 \int \int \int \int_{0}^{x} 
	e^{-a^2 / 2\sigma^2} e^{-b^2 / 2\sigma^2} e^{-c^2 / 2\sigma^2} e^{-d^2 / 2\sigma^2}
	  \, \mathrm{d}S_x \nonumber  \\
	  &= \frac{1}{4\pi^2\sigma^4} \int_{0}^{2\pi} \int_{0}^{\pi} \int_{0}^{\pi} \int_{0}^{x} 
	e^{-\rho^2 / 2\sigma^2} \rho^3\sin^2\theta\sin\phi \, \mathrm{d}\rho\, \mathrm{d}\theta\, \mathrm{d}\phi\, \mathrm{d}\psi \nonumber \\
	&=\frac{1}{4\pi^2\sigma^4} \int_{0}^{2\pi} \, \mathrm{d}\psi \int_{0}^{\pi}  \sin\phi \, \mathrm{d}\phi \int_{0}^{\pi}\sin^2\theta \, \mathrm{d}\theta \int_{0}^{x} \rho^3 e^{-\rho^2 / 2\sigma^2} \, \mathrm{d}\rho \nonumber \\
	&=\frac{1}{4\pi^2\sigma^4} 2 \pi 2 \left[\frac{\theta}{2}-\frac{\sin2\theta}{4}\right]_0^\pi \int_{0}^{x} \rho^3 e^{-\rho^2 / 2\sigma^2} \, \mathrm{d}\rho \nonumber \\
	&=\frac{1}{4\pi^2\sigma^4} 4 \pi  \frac{\pi}{2} \int_{0}^{x} \rho^3 e^{-\rho^2 / 2\sigma^2} \, \mathrm{d}\rho, \nonumber
\end{align}
\noindent
Then,
\begin{align}
	F_L(x,\sigma)&=\frac{1}{2\sigma^4} \int_{0}^{x} \rho^3 e^{-\rho^2 / 2\sigma^2} \, \mathrm{d}\rho.
\end{align}
\noindent
The probability density function for $X$ is the derivative of its cumulative distribution function, which by the fundamental theorem of calculus is:

\begin{align}
	f_L(x,\sigma) &= \frac{ \, \mathrm{d}}{ \, \mathrm{d}x} F_L(x,\sigma) \nonumber \\
	&=\frac{1}{2\sigma^4} x^3 e^{-x^2 / 2\sigma^2}.
\end{align}
\noindent
The expectation of the squared magnitude becomes:

\begin{align}
	\mathbb{E}(|W|^2) &=\int_{0}^{\infty} x^2f(x) \, \mathrm{d}x \nonumber \\
				     &=\int_{0}^{\infty} x^2 \frac{1}{2\sigma^4} x^3 e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x \nonumber \\
				     &=\frac{1}{2\sigma^4} \int_{0}^{\infty} x^5 e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x. \nonumber
\end{align}

\noindent
With integration by parts we obtain:

%\begin{align}
%	u &= x^4  \quad\quad\quad\quad\  \textrm{and} \quad \, \mathrm{d}u = 4x^3 \, \mathrm{d}x \nonumber \\
%	v &= - \sigma e^{-x^2 / 2\sigma^2}  \quad \textrm{and} \quad \, \mathrm{d}v = x e^{-x^2 / 2\sigma^2} \, \mathrm{d}x \nonumber
%\end{align}

\begin{align}
	\mathbb{E}(|W|^2) &=\frac{1}{2\sigma^4} \left(  \left. -x^4\sigma^2 e^{-x^2 / 2\sigma^2} \right\vert_{0}^{\infty} + \int_{0}^{\infty} \sigma^2 4x^3 e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x\right) \nonumber \\
				    &=\frac{1}{2\sigma^2} \left(  \left. -x^4 e^{-x^2 / 2\sigma^2} \right\vert_{0}^{\infty} + \int_{0}^{\infty} 4x^3 e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x\right) \label{eq:exp}.
\end{align}
\noindent
The expectation $\mathbb{E}(|W|^2)$ is the sum of two terms. The first one:
\begin{align}
	\left. -x^4 e^{-x^2 / 2\sigma^2}\right\vert_{0}^{\infty}&=\lim\limits_{x \rightarrow +\infty} -x^4 e^{-x^2 / 2\sigma^2} - \lim\limits_{x \rightarrow +0} x^4 e^{-x^2 / 2\sigma^2} \nonumber \\
	&=\lim\limits_{x \rightarrow +\infty} -x^4 e^{-x^2 / 2\sigma^2}, \nonumber
\end{align}

\noindent
Based on the  L'H\^opital's rule, the undetermined limit becomes:
\begin{align}
	\lim\limits_{x \rightarrow +\infty} -x^4 e^{-x^2 / 2\sigma^2} &=-\lim\limits_{x \rightarrow +\infty} \frac{x^4}{e^{x^2 / 2\sigma^2}} \nonumber \\
	&= \dots \nonumber \\
	&= -\lim\limits_{x \rightarrow +\infty} \frac{24}{(1/\sigma^2)(P(x) e^{x^2 / 2\sigma^2})} \label{eq:hopital} \\
	&=0 \nonumber.
\end{align}

\noindent
With $P(x)$ is polynomial and has a limit to $+\infty$. The second term is calculated in a same way (integration by parts) and $\mathbb{E}(|W|^2)$ becomes from Eq.(\ref{eq:exp}):

\begin{align}
	\mathbb{E}(|W|^2) &=\frac{1}{2\sigma^2}\int_{0}^{\infty} 4x^3 e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x \nonumber \\
				    &=\frac{2}{\sigma^2} \left(  \left. x^2\sigma^2 e^{-x^2 / 2\sigma^2} \right\vert_{0}^{\infty} + \int_{0}^{\infty} \sigma^2 2x e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x\right) \nonumber. \\
\end{align}
\noindent
The limit of first term is equals to $0$ with the same method than in Eq.(\ref{eq:hopital}). Therefore, the expectation is:
\begin{align}
	\mathbb{E}(|W|^2) &=4 \left(  \int_{0}^{\infty} x e^{-x^2 / 2\sigma^2}  \, \mathrm{d}x\right) \nonumber \\
	&=4\sigma^2.
\end{align}
\noindent
And finally the variance is:
\begin{align}
	Var(|W|)&=4\sigma^2.
\end{align}





\subsection{Quaternion backpropagation through time}
\label{app:qbptt}
Let us recall the forward equations and parameters needed to derive the complete quaternion backpropagation through time (QBPTT) algorithm.\\

\subsubsection{Recall of the forward phase}
Let $x_t$ be the input vector at timestep $t$, $h_t$ the hidden state, $W_{hh}$, $W_{xh}$ and  $W_{hy}$ the hidden state, input and output weight matrices respectively. Finally $b_h$ is the biases vector of the hidden states and $p_t$, $y_t$ are the output and the expected target vector.
\begin{equation}
    h_t = \alpha(h_t^{preact}),
\end{equation}
with,
\begin{equation}
    h_t^{preact} = W_{hh} \otimes h_{t-1} + W_{xh} \otimes x_t + b_h,
\end{equation}
and $\alpha$ is the quaternion split activation function \citep{xu2017learning} of a quaternion $Q$ defined as:
\begin{equation}
\alpha(Q)=f(r)+if(x)+jf(y)+kf(z),
\end{equation}
and $f$ corresponding to any standard activation function. The output vector $p_t$ can be computed as:
\begin{align}
    p_t = \beta(p_t^{preact}), 
\end{align}
with
\begin{align}
    p_t^{preact} = W_{hy} \otimes h_t,
\end{align}
and $\beta$ any split activation function. Finally, the objective function is a real-valued loss function applied component-wise. The gradient with respect to the MSE loss is expressed for each weight matrix as $\frac{\partial E_t}{\partial W_{hy}}$, $\frac{\partial E_t}{\partial W_{hh}}$, $\frac{\partial E_t}{\partial W_{hx}}$, and for the bias vector as $\frac{\partial E_t}{\partial B_{h}}$. In the real-valued space, the dynamic of the loss is only investigated based on all previously connected neurons. In this extent, the QBPTT differs from BPTT due to the fact that the loss must also be derived with respect to each component of a quaternion neural parameter, making it bi-level. This could act as a regularizer during the training process.  

\subsubsection{Output weight matrix}

The weight matrix $W_{hy}$ is used only in the computation of $p_t$. It is therefore straightforward to compute $\frac{\partial E_t}{\partial W_{hy}}$:
\begin{align}
\centering
\pderiv{E_t}{W_{hy}} = \pderiv{E_t}{W_{hy}^r} + i\pderiv{E_t}{W_{hy}^i} +j\pderiv{E_t}{W_{hy}^j}+k\pderiv{E_t}{W_{hy}^k}.
\end{align}
Each quaternion component is then derived following the chain rule:
\begin{equation}
\begin{split}
\pderiv{E_t}{W_{hy}^r} & = \pderiv{E_t}{p_{t}^r} \pderiv{p_{t}^r}{W_{hy}^r} + \pderiv{E_t}{p_{t}^i} \pderiv{p_{t}^i}{W_{hy}^r} + \pderiv{E_t}{p_{t}^j} \pderiv{p_{t}^j}{W_{hy}^r} + \pderiv{E_t}{p_{t}^k} \pderiv{p_{t}^k}{W_{hy}^r}\\
& = ( p_{t}^r - y^r_{t}) \times h_{t}^r + ( p_{t}^i - y^{i}_{t}) \times h_{t}^i + ( p_{t}^j - y^{j}_{t}) \times h_{t}^j + ( p_{t}^k - y^{k}_{t}) \times h_{t}^k.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{E_t}{W_{hy}^i} & = \pderiv{E_t}{p_{t}^r} \pderiv{p_{t}^r}{W_{hy}^i} + \pderiv{E_t}{p_{t}^i} \pderiv{p_{t}^i}{W_{hy}^i} + \pderiv{E_t}{p_{t}^j} \pderiv{p_{t}^j}{W_{hy}^i} + \pderiv{E_t}{p_{t}^k} \pderiv{p_{t}^k}{W_{hy}^i}\\
& = ( p_{t}^r - y^r_{t}) \times -h_{t}^i + ( p_{t}^i - y^{i}_{t}) \times h_{t}^r + ( p_{t}^j - y^{j}_{t}) \times h_{t}^k + ( p_{t}^k - y^{k}_{t}) \times -h_{t}^j.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{E_t}{W_{hy}^j} & = \pderiv{E_t}{p_{t}^r} \pderiv{p_{t}^r}{W_{hy}^j} + \pderiv{E_t}{p_{t}^i} \pderiv{p_{t}^i}{W_{hy}^j} + \pderiv{E_t}{p_{t}^j} \pderiv{p_{t}^j}{W_{hy}^j} + \pderiv{E_t}{p_{t}^k} \pderiv{p_{t}^k}{W_{hy}^j}\\
& = ( p_{t}^r - y^r_{t}) \times -h_{t}^j + ( p_{t}^i - y^{i}_{t}) \times -h_{t}^k + ( p_{t}^j - y^{j}_{t}) \times h_{t}^r + ( p_{t}^k - y^{k}_{t}) \times h_{t}^i.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{E_t}{W_{hy}^k} & = \pderiv{E_t}{p_{t}^r} \pderiv{p_{t}^r}{W_{hy}^k} + \pderiv{E_t}{p_{t}^i} \pderiv{p_{t}^i}{W_{hy}^k} + \pderiv{E_t}{p_{t}^j} \pderiv{p_{t}^j}{W_{hy}^k} + \pderiv{E_t}{p_{t}^k} \pderiv{p_{t}^k}{W_{hy}^k}\\
& = ( p_{t}^r - y^r_{t}) \times -h_{t}^k + ( p_{t}^i - y^{i}_{t}) \times h_{t}^j + ( p_{t}^j - y^{j}_{t}) \times -h_{t}^i + ( p_{t}^k - y^{k}_{t}) \times h_{t}^r.
\end{split}
\end{equation}
By regrouping in a matrix form the $h_t$ components from these equations, one can define:
\begin{align}
\label{eq:hconj}
\begin{bmatrix}
   h_{t}^r & h_{t}^i & h_{t}^j & h_{t}^k \\
   -h_{t}^i & h_{t}^r & h_{t}^k & -h_{t}^j \\
   -h_{t}^j & -h_{t}^k & h_{t}^r & h_{t}^i \\
   -h_{t}^k & h_{t}^j & -h_{t}^i & h_{t}^r 
\end{bmatrix}
= h_t^*.
\end{align}
Therefore,
\begin{align}
\centering
\pderiv{E_t}{W_{hy}} = (p_{t} - y_{t}) \otimes h_t^*.
\end{align}

\subsubsection{Hidden weight matrix}

Conversely to $W_{hy}$ the weight matrix $W_{hh}$ is an argument of $h_t$ with $h_{t-1}$ involved. The recursive backpropagation can thus be derived as:
\begin{equation}
\begin{split}
\pderiv{E}{W_{hh}} = \sum_{t=0}^{N} \pderiv{E_t}{W_{hh}}.
\end{split}
\end{equation}
And,
\begin{equation}
\label{eq:hidden}
\begin{split}
\pderiv{E_t}{W_{hh}} = \sum\limits_{m=0}^t \pderiv{E_m}{W_{hh}^r} + i\pderiv{E_m}{W_{hh}^r} + j\pderiv{E_m}{W_{hh}^i} + k\pderiv{E_m}{W_{hh}^k},
\end{split}
\end{equation}
with $N$ the number of timesteps that compose the sequence. As for $W_{hy}$ we start with $\pderiv{E_k}{W_{hh}^r}$:
\begin{equation}
\label{eq:}
\begin{split}
\sum\limits_{m=0}^t \pderiv{E_m}{W_{hh}^r}  = \sum\limits_{m=0}^t \pderiv{E_t}{h_{t}^r} \pderiv{h_{t}^r}{h_{m}^r}\pderiv{h_{m}^r}{W_{hh}^r}  + \pderiv{E_t}{h_{t}^i} \pderiv{h_{t}^i}{h_{m}^i}\pderiv{h_{m}^i}{W_{hh}^r} & \\ +
\pderiv{E_t}{h_{t}^j} \pderiv{h_{t}^j}{h_{m}^j}\pderiv{h_{m}^j}{W_{hh}^r} + 
\pderiv{E_t}{h_{t}^k} \pderiv{h_{t}^i}{h_{m}^k}\pderiv{h_{m}^k}{W_{hh}^r}. 
\end{split}
\end{equation}
Non-recursive elements are derived w.r.t r, \textbf{i},\textbf{j}, \textbf{k}:
\begin{equation}
\begin{split}
\pderiv{E_t}{h_{t}^r} & = \pderiv{E_t}{p_{t}^r}\pderiv{p_{t}^r}{h_{t}^r} + \pderiv{E_t}{p_{t}^i}\pderiv{p_{t}^i}{h_{t}^r} + \pderiv{E_t}{p_{t}^j}\pderiv{p_{t}^j}{h_{t}^r}
+ \pderiv{E_t}{p_{t}^k}\pderiv{p_{t}^k}{h_{t}^r}\\ 
& = ( p_{t}^r - y_{t}^r) \times f^{'}(p_{t}^r) \times W_{hy}^r + ( p_{t}^i - y_{t}^i) \times f^{'}(p_{t}^i) \times W_{hy}^i \\&+( p_{t}^j - y_{t}^j) \times f^{'}(p_{t}^j) \times W_{hy}^j + ( p_{t}^k - y_{t}^k) \times f^{'}(p_{t}^k) \times W_{hy}^k.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{E_t}{h_{t}^i} & = \pderiv{E_t}{p_{t}^r}\pderiv{p_{t}^r}{h_{t}^i} + \pderiv{E_t}{p_{t}^i}\pderiv{p_{t}^i}{h_{t}^i} + \pderiv{E_t}{p_{t}^j}\pderiv{p_{t}^j}{h_{t}^i}
+ \pderiv{E_t}{p_{t}^k}\pderiv{p_{t}^k}{h_{t}^i}\\ 
& = ( p_{t}^r - y_{t}^r) \times f^{'}(p_{t}^r) \times -W_{hy}^i + ( p_{t}^i - y_{t}^i) \times f^{'}(p_{t}^i) \times W_{hy}^r \\&+( p_{t}^j - y_{t}^j) \times f^{'}(p_{t}^j) \times W_{hy}^k + ( p_{t}^k - y_{t}^k) \times f^{'}(p_{t}^k) \times -W_{hy}^j.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{E_t}{h_{t}^j} & = \pderiv{E_t}{p_{t}^r}\pderiv{p_{t}^r}{h_{t}^j} + \pderiv{E_t}{p_{t}^i}\pderiv{p_{t}^i}{h_{t}^j} + \pderiv{E_t}{p_{t}^j}\pderiv{p_{t}^j}{h_{t}^j}
+ \pderiv{E_t}{p_{t}^k}\pderiv{p_{t}^k}{h_{t}^j}\\ 
& = ( p_{t}^r - y_{t}^r) \times f^{'}(p_{t}^r) \times -W_{hy}^j + ( p_{t}^i - y_{t}^i) \times f^{'}(p_{t}^i)\times -W_{hy}^k \\&+( p_{t}^j - y_{t}^j) \times f^{'}(p_{t}^j)\times W_{hy}^r + ( p_{t}^k - y_{t}^k) \times f^{'}(p_{t}^k)\times W_{hy}^i.
\end{split}
\end{equation}

\begin{equation}
\begin{split}
\pderiv{E_t}{h_{t}^k} & = \pderiv{E_t}{p_{t}^r}\pderiv{p_{t}^r}{h_{t}^k} + \pderiv{E_t}{p_{t}^i}\pderiv{p_{t}^i}{h_{t}^k} + \pderiv{E_t}{p_{t}^j}\pderiv{p_{t}^j}{h_{t}^k}
+ \pderiv{E_t}{p_{t}^k}\pderiv{p_{t}^k}{h_{t}^k}\\ 
& = ( p_{t}^r - y_{t}^r)\times f^{'}(p_{t}^r)\times -W_{hy}^k + ( p_{t}^i - y_{t}^i) \times f^{'}(p_{t}^i)\times W_{hy}^j\\ &+( p_{t}^j - y_{t}^j) \times f^{'}(p_{t}^j)\times -W_{hy}^i + ( p_{t}^k - y_{t}^k) \times f^{'}(p_{t}^k) \times W_{hy}^r.
\end{split}
\end{equation}

Then,

\begin{align}
\label{eq:hconj}
\begin{bmatrix}
   \pderiv{h_{r,m}}{W_{hh}^r} = h_{r,t-1} & \pderiv{h_{i,m}}{W_{hh}^r} = h_{i,t-1} & \pderiv{h_{j,m}}{W_{hh}^r} = h_{j,t-1} & \pderiv{h_{k,m}}{W_{hh}^r} = h_{k,t-1} \\
   \pderiv{h_{r,m}}{W_{hh}^i} = -h_{i,t-1} & \pderiv{h_{i,m}}{W_{hh}^r} = h_{i,t-1} & \pderiv{h_{j,m}}{W_{hh}^r} = h_{j,t-1} & \pderiv{h_{k,m}}{W_{hh}^r} = h_{k,t-1} \\
   \pderiv{h_{r,m}}{W_{hh}^j} = -h_{j,t-1} & \pderiv{h_{i,m}}{W_{hh}^j} = -h_{k,t-1} & \pderiv{h_{j,m}}{W_{hh}^j} = h_{r,t-1} & \pderiv{h_{k,m}}{W_{hh}^j} = h_{i,t-1} \\ 
   \pderiv{h_{r,m}}{W_{hh}^k} = -h_{k,t-1} & \pderiv{h_{i,m}}{W_{hh}^k} = h_{j,t-1} & \pderiv{h_{j,m}}{W_{hh}^k} = -h_{i,t-1} & \pderiv{h_{k,m}}{W_{hh}^k} = h_{r,t-1}
\end{bmatrix}
= h_t^*.
\end{align}

The remaining terms $\pderiv{h_{t}^r}{h_{m}^r}$,$\pderiv{h_{t}^i}{h_{m}^i}$,$\pderiv{h_{t}^j}{h_{m}^j}$ and $\pderiv{h_{t}^k}{h_{m}^k}$ are recursive and are written as:

\begin{equation}
\begin{split}
\pderiv{h_{r,t}}{h_{r,m}} = \prod_{n=m+1}^{t}\pderiv{h_{r,n}}{h^{preact}_{r,n}}\pderiv{h_{r,n}^{preact}}{h_{r,n-1}} + \pderiv{h_{r,n}}{h_{i,n}^{preact}}\pderiv{h_{i,n}^{preact}}{h_{r,n-1}}& \\ +\pderiv{h_{r,n}}{h_{j,n}^{preact}}\pderiv{h_{j,n}^{preact}}{h_{r,n-1}} + \pderiv{h_{r,n}}{h_{k,n}^{preact}}\pderiv{h_{k,n}^{preact}}{h_{r,n-1}},
\end{split}
\end{equation}
simplified with,
\begin{equation}
\begin{split}
\pderiv{h_{r,t}}{h_{r,m}} = \prod_{n=m+1}^{t}\pderiv{h_{r,n}}{h_{r,n}^{preact}}\times W_{hh}^r + \pderiv{h_{r,n}}{h_{i,n}^{preact}}\times W_{hh}^i& \\ +\pderiv{h_{r,n}}{h_{j,n}^{preact}}\times W_{hh}^j+ \pderiv{h_{r,n}}{h_{k,n}^{preact}}\times W_{hh}^k.
\end{split}
\end{equation}
Consequently,
\begin{equation}
\begin{split}
\pderiv{h_{i,t}}{h_{i,m}} = \prod_{n=m+1}^{t}\pderiv{h_{i,n}}{h_{r,n}^{preact}}\times -W_{hh}^i + \pderiv{h_{i,n}}{h_{i,n}^{preact}}\times W_{hh}^r& \\ +\pderiv{h_{j,n}}{h_{j,n}^{preact}}\times W_{hh}^k + \pderiv{h_{i,n}}{h_{k,n}^{preact}}\times -W_{hh}^j.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{h_{j,t}}{h_{j,m}} = \prod_{n=m+1}^{t}\pderiv{h_{j,n}}{h_{r,n}^{preact}}\times -W_{hh}^j + \pderiv{h_{j,n}}{h_{i,n}^{preact}}\times -W_{hh}^k& \\ +\pderiv{h_{j,n}}{h_{j,n}^{preact}}\times W_{hh}^r+ \pderiv{h_{j,n}}{h_{k,n}^{preact}}\times W_{hh}^i.
\end{split}
\end{equation}
\begin{equation}
\begin{split}
\pderiv{h_{k,t}}{h_{k,m}} = \prod_{n=m+1}^{t}\pderiv{h_{k,n}}{h_{r,n}^{preact}}\times -W_{hh}^k + \pderiv{h_{k,n}}{h_{i,n}^{preact}}\times W_{hh}^j& \\ +\pderiv{h_{k,n}}{h_{j,n}^{preact}}\times -W_{hh}^i+ \pderiv{h_{k,n}}{h_{k,n}^{preact}}\times W_{hh}^r.
\end{split}
\end{equation}
The same operations are performed for \textbf{i},\textbf{j},\textbf{k} in Eq. \ref{eq:hidden} and $\frac{\partial E_t}{\partial W_{hh}}$ can finally be expressed as:
\begin{align}
   \frac{\partial E_t}{\partial W_{hh}} = \sum\limits_{m=0}^t  (\prod_{n=m+1}^{t} \delta_n ) \otimes h_{t-1}^*,
\end{align}
with,
\begin{equation}
\begin{split}
\delta_{n} = \left\{
    \begin{array}{ll}
        W_{hh}^* \otimes\delta_{n+1}\times\alpha{'}(h_{n}^{preact}) & \mbox{if }  n \neq  t\\
        W_{hy}^* \otimes (p_{n} - y_{n}) \times \beta^{'}(p_{n}^{preact})  & \mbox{else.}
    \end{array}
\right.
\end{split}
\end{equation}

\subsubsection{Input weight matrix}

$\frac{\partial E_t}{\partial W_{hx}}$ is computed in the exact same manner as $\frac{\partial E_t}{\partial W_{hh}}$.
\begin{equation}
\begin{split}
\pderiv{E}{W_{hx}} = \sum_{t=0}^{N} \pderiv{E_t}{W_{hx}}.
\end{split}
\end{equation}
And,
\begin{equation}
\label{eq:hidden}
\begin{split}
\pderiv{E_t}{W_{hx}} = \sum\limits_{m=0}^t \pderiv{E_m}{W_{hx}^r} + i\pderiv{E_m}{W_{hx}^r} + j\pderiv{E_m}{W_{hx}^i} + k\pderiv{E_m}{W_{hx}^k}. 
\end{split}
\end{equation}
Therefore $\frac{\partial E_t}{\partial W_{hx}}$ is easily extent as:
\begin{align}
   \frac{\partial E_t}{\partial W_{hx}} = \sum\limits_{m=0}^t  (\prod_{n=m+1}^{t} \delta_n ) \otimes x_{t}^*.
\end{align}

\subsubsection{Hidden biases}

$\frac{\partial E_t}{\partial B_{h}}$ can easily be extended to:

\begin{equation}
\begin{split}
\pderiv{E}{B_{h}} = \sum_{t=0}^{N} \pderiv{E_t}{B_{h}}.
\end{split}
\end{equation}
And,
\begin{equation}
\begin{split}
\pderiv{E_t}{B_{h}} = \sum\limits_{m=0}^t \pderiv{E_m}{B_{h}^r} + i\pderiv{E_m}{B_{h}^r} + j\pderiv{E_m}{B_{h}^i} + k\pderiv{E_m}{B_{h}^k}. 
\end{split}
\end{equation}
Nonetheless, since biases are not connected to any inputs or hidden states, the matrix of derivatives defined in Eq. \ref{eq:hconj} becomes a matrix of $1$. Consequently $\frac{\partial E_t}{\partial B_{h}}$ can be summarized as:
\begin{align}
   \frac{\partial E_t}{\partial B_{h}} = \sum\limits_{m=0}^t  (\prod_{n=m+1}^{t} \delta_n ).
\end{align}

\end{document}