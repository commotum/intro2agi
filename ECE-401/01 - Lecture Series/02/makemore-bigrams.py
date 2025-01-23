import torch
import torch.nn.functional as F
from collections import Counter
import time
from datetime import datetime

def print_header(text):
    print(f"\n{'='*80}\n{text}\n{'='*80}")

# Data Loading & Statistics
print_header("Loading Data & Statistics")
# Load names.txt which contains ~32k names from a government website
words = open('names.txt', 'r').read().splitlines()
print(f"Loaded {len(words):,} words from names.txt")
print(f"\nSample names: {', '.join(words[:10])}")
print(f"Name lengths: min={min(len(w) for w in words)}, max={max(len(w) for w in words)}")

# Character distribution analysis
all_chars = ''.join(words)
char_counts = Counter(all_chars)
total_chars = len(all_chars)
print("\nCharacter distribution:")
for char, count in sorted(char_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
    percentage = (count/total_chars) * 100
    print(f"  {char}: {count:,} ({percentage:.1f}%)")

# Bigram Analysis - analyzing pairs of consecutive characters
print_header("Bigram Analysis")
# Get sorted list of unique characters and create lookup tables
chars = sorted(list(set(all_chars)))
# Create mapping from characters to integers (s2i) and back (i2s)
# '.' is a special start/end token with index 0
stoi = {s:i+1 for i,s in enumerate(chars)}
stoi['.'] = 0
itos = {i:s for s,i in stoi.items()}

# Create 27x27 tensor to store bigram counts (26 letters + special token)
N = torch.zeros((27, 27), dtype=torch.int32)

# Count frequency of character pairs in the dataset
for w in words:
    chs = ['.'] + list(w) + ['.']  # Add start/end tokens
    for ch1, ch2 in zip(chs, chs[1:]):
        ix1 = stoi[ch1]
        ix2 = stoi[ch2]
        N[ix1, ix2] += 1

# Print bigram statistics
unique_bigrams = (N > 0).sum().item()
print(f"Found {unique_bigrams:,} unique bigrams")

print("\nTop 10 most common bigrams:")
bigram_counts = []
for i in range(27):
    for j in range(27):
        if N[i,j] > 0:
            bigram_counts.append((f"{itos[i]}{itos[j]}", N[i,j].item()))
for bigram, count in sorted(bigram_counts, key=lambda x: x[1], reverse=True)[:10]:
    print(f"  {bigram}: {count:,}")

# Generate names using bigram probabilities
print("\nGenerating 10 names using bigram probabilities:")
# Add 1 smoothing to avoid zero probabilities
P = (N+1).float()
# Normalize rows to create probability distributions
P /= P.sum(1, keepdims=True)
g = torch.Generator().manual_seed(2147483647)

# Sample names character by character using the probability distributions
for i in range(10):
    out = []
    ix = 0  # Start with special token
    while True:
        p = P[ix]  # Get probability distribution for next character
        ix = torch.multinomial(p, num_samples=1, replacement=True, generator=g).item()
        out.append(itos[ix])
        if ix == 0:  # Stop if we generate the end token
            break
    print(f"  {''.join(out[1:-1])}")

# Neural Network Training
print_header("Training Neural Network")

# Create training data for neural network
xs, ys = [], []
for w in words:
    chs = ['.'] + list(w) + ['.']
    for ch1, ch2 in zip(chs, chs[1:]):
        ix1 = stoi[ch1]
        ix2 = stoi[ch2]
        xs.append(ix1)  # Input character
        ys.append(ix2)  # Target next character
xs = torch.tensor(xs)
ys = torch.tensor(ys)
num = xs.nelement()
print(f"Created {num:,} training examples")

# Initialize network weights
g = torch.Generator().manual_seed(2147483647)
# Each neuron receives 27 inputs (one-hot encoded characters)
W = torch.randn((27, 27), generator=g, requires_grad=True)

# Training loop
print("\nTraining progress:")
num_epochs = 100
start_time = time.time()

for k in range(num_epochs):
    # Forward pass
    xenc = F.one_hot(xs, num_classes=27).float()  # One-hot encode input characters
    logits = xenc @ W  # Matrix multiply to get logits
    counts = logits.exp()  # Convert to counts (similar to bigram counts)
    probs = counts / counts.sum(1, keepdims=True)  # Normalize to get probabilities
    # Calculate loss (negative log likelihood) with L2 regularization
    loss = -probs[torch.arange(num), ys].log().mean() + 0.01*(W**2).mean()
    
    # Backward pass
    W.grad = None
    loss.backward()
    
    # Update weights using gradient descent
    W.data += -50 * W.grad
    
    if k % 10 == 0:
        print(f"  epoch {k:3d}/{num_epochs}: loss = {loss.item():.4f}")

training_time = time.time() - start_time
print(f"\nTraining completed in {training_time:.2f} seconds")

# Generate names using trained model
print_header("Generating Names Using Trained Model")
print("Generating 20 names:")

name_lengths = []
generated_chars = []

for i in range(20):
    out = []
    ix = 0
    while True:
        xenc = F.one_hot(torch.tensor([ix]), num_classes=27).float()
        logits = xenc @ W
        counts = logits.exp()
        p = counts / counts.sum(1, keepdims=True)
        ix = torch.multinomial(p, num_samples=1, replacement=True, generator=g).item()
        out.append(itos[ix])
        if ix == 0:
            break
    
    name = ''.join(out[1:-1])
    name_lengths.append(len(name))
    generated_chars.extend(list(name))
    print(f"  {name}")

# Print generation statistics
avg_length = sum(name_lengths) / len(name_lengths)
print(f"\nGeneration Statistics:")
print(f"  Average name length: {avg_length:.1f} characters")
print(f"  Length range: {min(name_lengths)} to {max(name_lengths)} characters")

char_dist = Counter(generated_chars)
print("\nMost common characters in generated names:")
for char, count in sorted(char_dist.items(), key=lambda x: x[1], reverse=True)[:5]:
    percentage = (count/len(generated_chars)) * 100
    print(f"  {char}: {percentage:.1f}%")