# Neural Networks Discussion - From Bigrams to Matrix Operations

## Session Overview
This conversation covered key concepts from Andrej Karpathy's "Neural Networks: Zero to Hero" lecture series, specifically focusing on bigram character-level language models and fundamental neural network concepts.

## Bigram Language Models
A bigram character-level language model looks at pairs of characters to predict what comes next in a sequence. This forms the foundation for more complex models like GPT, which can look at much longer sequences.

## Key Concepts Covered

### N-grams
An n-gram is a sequence of n consecutive characters or words from text. For example, in the word "hello":
- 1-grams (unigrams): 'h', 'e', 'l', 'l', 'o'
- 2-grams (bigrams): 'he', 'el', 'll', 'lo'
- 3-grams (trigrams): 'hel', 'ell', 'llo'

### Broadcasting in PyTorch
Broadcasting determines how arrays of different shapes interact in operations. Key rules:
1. Arrays must have same dimensions, or
2. One array must have size 1 in the mismatched dimension

Example:
```python
matrix = [[1, 2, 3],
          [4, 5, 6]]   # Shape: (2, 3)

vector = [10, 20]      # Shape: (2,)

# Adding to rows:
[[11, 12, 13],
 [24, 25, 26]]

# Adding to columns:
[[11, 12, 13],
 [14, 15, 16]]
```

### Negative Log Likelihood (NLL)
NLL measures the "surprise" of seeing actual data given model predictions. It converts probabilities into "surprise scores":
- High probability → Low surprise (close to 0)
- Low probability → High surprise (big number)

```python
-log(0.9) = 0.105   # Low number = small surprise
-log(0.001) = 6.908 # High number = big surprise
```

Note: PyTorch's `torch.log()` computes the natural logarithm (ln).

### Python Slicing
Using example list: `letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']`

Basic slicing operations:
```python
letters[2:5]    # ['c', 'd', 'e']  
letters[:3]     # ['a', 'b', 'c']  
letters[3:]     # ['d', 'e', 'f', 'g']  
letters[:]      # ['a', 'b', 'c', 'd', 'e', 'f', 'g']  
letters[::2]    # ['a', 'c', 'e', 'g']  
letters[-3:]    # ['e', 'f', 'g']  
letters[::-1]   # ['g', 'f', 'e', 'd', 'c', 'b', 'a']  
```

### Matrix Operations
Different types of products in linear algebra:

1. Dot Product:
```python
a = [1, 2]
b = [3, 4]
dot = (1*3) + (2*4)  # Scalar result: 11
```

2. Cross Product (3D vectors):
```python
a = [1, 0, 0]  # pointing right
b = [0, 1, 0]  # pointing up
cross = [0, 0, 1]  # points out of screen
```

3. Outer Product:
```python
a = [1, 2]
b = [3, 4]
outer = [[1*3, 1*4],  # [[3, 4],
         [2*3, 2*4]]  #  [6, 8]]
```

4. Hadamard Product:
```python
a = [1, 2, 3]
b = [4, 5, 6]
hadamard = [1*4, 2*5, 3*6]  # [4, 10, 18]
```

### Activation Functions
Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns. The term likely comes from neuroscience, where neurons "activate" or "fire" when receiving sufficient stimulus.

Key activation functions:
- ReLU: Passes through positive inputs unchanged, silences negative inputs
- Sigmoid: Squishes inputs into range [0,1]
- tanh: Similar to sigmoid but ranges [-1,1]
- Softmax: Converts raw scores into probabilities that sum to 1

#### Softmax Example:
```python
raw_scores = [2.0, 4.2, 1.5]
exponents = [7.39, 66.69, 4.48]  # e^2.0, e^4.2, e^1.5
sum_exp = 78.56  # 7.39 + 66.69 + 4.48
probabilities = [0.09, 0.85, 0.06]  # Each exponent divided by sum
```

The name "softmax" comes from it being a "soft" version of the "max" function, giving probabilities that emphasize larger values while maintaining some uncertainty.
