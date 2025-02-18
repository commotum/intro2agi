# LLM-Driven Skill Graph Tool for University Courses

A tool for LLMs like ChatGPT that maintains:

- **A directed knowledge graph of core skills and sub-skills** for various university courses and their learning objectives.
- **A separate User graph** that shows which skills the user has mastered.

The system uses heuristics and LLM evaluation of student questions to determine missing skills. For example, it might track questions about properties of exponents and, more specifically, the power of a power law.

---

## The Cycle

1. **Student Query:**  
   _Example:_  
   > In the following problems, use a suitable change of variables to determine the indefinite integral.  
   > $$\int \frac{x^7}{\sqrt{1+x^4}} dx$$

2. **LLM Analysis:**  
   The LLM (behind the scenes) breaks down the question into core and sub-skills.

   ### **Core Skill**
   - **U-Substitution (Change of Variables in Integration)**

   ### **Sub-Skills**
   1. **Properties of Exponents**
      - Recognize that $x^7 = x^3 \cdot x^4$ to match terms with $du$.
      - Express the integral entirely in terms of $u$.
   2. **Pattern Recognition**
      - Identify $1+x^4$ as a candidate for substitution since its derivative $4x^3\,dx$ appears.
   3. **Differentiation for Substitution**
      - For $u = 1+x^4$, differentiate to get $du = 4x^3\,dx$ and replace $x^3\,dx$ in the integral.
   4. **Algebraic Manipulation**
      - Rewrite $x^7\,dx$ in terms of $u$ using exponent properties.
   5. **Basic Integration Techniques**
      - Apply standard integration techniques once the integral is expressed in terms of $u$.
   6. **Back-Substitution**
      - Re-express the final result in terms of $x$.

3. **LLM Diagnostic Questions:**  
   The LLM uses probing questions to diagnose where a student may be weak:

   ---
   
   ### **1. Identifying the Need for Substitution**
   - **Diagnostic:**
     - *What makes this integral difficult to solve directly?*
     - *Do you see a function whose derivative is present in the integral?*
   - **Reinforcement:**
     - *If given $$\int \frac{x}{\sqrt{1+x^2}} dx$$, how would you approach it?*
     - *When do we use substitution in integration?*
   - **Retest:**
     - *Given $$\int \frac{x^{11}}{\sqrt{1+x^6}} dx$$, what substitution would you use and why?*

   ---

   ### **2. Recognizing the Substitution $u=1+x^4$**
   - **Diagnostic:**
     - *What substitution simplifies $$\sqrt{1+x^4}$$?*
     - *What is $du/dx$ if $u=1+x^4$?*
   - **Reinforcement:**
     - *For $u=1+x^2$, what is $du$ and how do you rewrite $dx$?*
     - *For $u=x^n$, how do you find $du$?*
   - **Retest:**
     - *What substitution would work for $$\int \frac{x^{5}}{\sqrt{1+x^6}} dx$$ and why?*

   ---

   ### **3. Manipulating the Integral Properly**
   #### **(a) Exponent Rules**
   - **Diagnostic:**
     - *Can you rewrite $x^7$ as $x^4 \cdot x^3$?*
     - *Why is this helpful?*
   - **Reinforcement:**
     - *Rewrite $x^{11}$ in terms of $x^6$ and another power of $x$.*
   - **Retest:**
     - *Rewrite $x^{10}$ in terms of $x^6$ and another power of $x$.*
     - *Given $u=1+x^6$, rewrite $x^{10}\,dx$ entirely in terms of $u$ and $du$.*
   
   #### **(b) Expressing $dx$ Properly**
   - **Diagnostic:**
     - *If $du = 4x^3\,dx$, how do we express $dx$ in terms of $du$?*
   - **Reinforcement:**
     - *Solve for $dx$ if $du = 6x^5\,dx$.*
   - **Retest:**
     - *Given $du = 5x^4\,dx$, solve for $dx$ and rewrite $x^9\,dx$ in terms of $u$ and $du$.*
   
   ---

   ### **4. Solving the Integral**
   - **Diagnostic:**
     - *What does the integral look like in terms of $u$ after substitution?*
     - *Can you recognize a standard integral form like $$\int u^n\,du$$?*
   - **Reinforcement:**
     - *What is $$\int u^{3/2}du$$?*
     - *Apply the formula $$\int u^n du = \frac{u^{n+1}}{n+1}$$ to $$\int u^{-1/2} du$$.*
   - **Retest:**
     - *Solve $$\int (1+z^4)^{-1/2}dz$$.*

   ---

   ### **5. Back-Substituting and Verifying the Answer**
   - **Diagnostic:**
     - *What was our original substitution?*
     - *Why must the final answer be expressed in terms of $x$?*
   - **Reinforcement:**
     - *If $u = 1+x^4$, express $u^{3/2}$ back in terms of $x$.*
   - **Retest:**
     - *Given $u = x^6 + 1$, rewrite $u^{5/3}$ in terms of $x$.*
   
   ---

## **Final Summary of Approach**

1. **Recognizing the Need for Substitution**  
   – Spot patterns and the derivative within the integral.

2. **Choosing the Right Substitution**  
   – Identify expressions whose derivatives are present.

3. **Rewriting Terms Correctly**  
   – Use exponent rules and solve for $dx$.

4. **Performing the Integral**  
   – Apply power rule integration.

5. **Back-Substituting**  
   – Convert the answer back to the original variable $x$.

---

## **Socratic Dialogue Example**

### **LLM:**

Alright! You’ve built up all the key skills—now let’s apply them to the original problem:  
$$I=\int \frac{x^7}{\sqrt{1+x^4}}\,dx$$  
How should we go about solving this?

### **Student:**

I think I need to use substitution, but I’m not sure what to pick.

### **LLM:**

Good instinct—substitution is the way to go! Notice the denominator $ \sqrt{1+x^4} $. What function inside that square root might be useful?

### **Student:**

Maybe $ u = 1+x^4 $?

### **LLM:**

Yes! Now differentiate: what is $du$ if $u = 1+x^4$?

### **Student:**

Differentiating, $du = 4x^3\,dx$.

### **LLM:**

Exactly. Now, the numerator is $x^7\,dx$. Can you break it up to match $x^3\,dx$ from $du$?

### **Student:**

I can write $x^7 = x^4 \cdot x^3$, matching the $x^3\,dx$ with $du$.

### **LLM:**

Great! Next, express $x^4$ in terms of $u$.

### **Student:**

Since $u = 1+x^4$, then $x^4 = u - 1$.

### **LLM:**

Perfect. Substitute everything into the integral:

- Replace $x^4$ with $u-1$.
- Replace $x^3\,dx$ with $\frac{du}{4}$.

What does the integral become?

### **Student:**

It becomes:
$$\int \frac{(u-1)}{\sqrt{u}} \cdot \frac{du}{4} = \frac{1}{4}\int \left(\frac{u-1}{\sqrt{u}}\right) du$$

### **LLM:**

Nicely done. Simplify the integrand.

### **Student:**

Splitting the fraction:
$$\frac{u-1}{\sqrt{u}} = \frac{u}{\sqrt{u}} - \frac{1}{\sqrt{u}} = u^{1/2} - u^{-1/2}$$  
So, the integral is:
$$\frac{1}{4}\int \left(u^{1/2} - u^{-1/2}\right) du$$

### **LLM:**

Great! Now integrate each term using the power rule:
- $$\int u^{1/2}du = \frac{2}{3}u^{3/2}$$
- $$\int u^{-1/2}du = 2u^{1/2}$$

What is the resulting expression?

### **Student:**

We have:
$$\frac{1}{4}\left(\frac{2}{3}u^{3/2} - 2u^{1/2}\right) + C$$

### **LLM:**

Excellent! Finally, substitute back $u = 1+x^4$:

### **Student:**

The final answer is:
$$\frac{1}{4}\left(\frac{2}{3}(1+x^4)^{3/2} - 2(1+x^4)^{1/2}\right) + C$$

### **LLM:**

Perfect! You solved the problem by carefully applying substitution, algebraic manipulation, integration, and back-substitution.

---

This approach scaffolds the student’s learning through:
- **Diagnostic questions** to identify weak points.
- **Reinforcement questions** to solidify the concept.
- **Retest questions** to confirm understanding.

Would you like to try another example to reinforce this skill?


