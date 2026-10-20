// Practicals Data Store for AIML and OSC
const PRACTICALS_DATA = {
  aiml: {
    id: "aiml",
    title: "Artificial Intelligence & Machine Learning",
    shortName: "AIML",
    badge: "10 Practicals",
    description: "Practical implementations of AI search algorithms, supervised learning, neural networks, and computer vision models in Python.",
    programs: [
      {
        id: "aiml-1",
        num: 1,
        title: "Breadth-First Search (BFS) and Depth-First Search (DFS)",
        category: "Graph Search Algorithms",
        description: "Implement graph traversal techniques using Breadth-First Search (queue based) and Depth-First Search (stack based).",
        runCommand: "python \"1. Breadth-First Search (BFS) and Depth-First .py\"",
        expectedOutput: `Breadth-First Search (BFS):
['A', 'B', 'C', 'D', 'E', 'F', 'G']

Depth-First Search (DFS):
['A', 'B', 'D', 'E', 'G', 'C', 'F']`,
        files: [
          {
            name: "1. Breadth-First Search (BFS) and Depth-First .py",
            lang: "python",
            icon: "py",
            content: `graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['G'],
    'F': [],
    'G': []
}

def bfs(graph, start):
    visited = []
    queue = [start]
    while queue:
        node = queue.pop(0) 
        if node not in visited:
            visited.append(node)
            queue.extend(graph[node])
    return visited

def dfs(graph, start):
    visited = []
    stack = [start]
    while stack:
        node = stack.pop() 
        if node not in visited:
            visited.append(node)
            stack.extend(reversed(graph[node]))
    return visited

start_node = 'A'
print("Breadth-First Search (BFS):")
print(bfs(graph, start_node))
print("\\nDepth-First Search (DFS):")
print(dfs(graph, start_node))
`
          }
        ]
      },
      {
        id: "aiml-2",
        num: 2,
        title: "8-Puzzle Problem using State-Space Representation",
        category: "State Space Search",
        description: "Solve the classic 8-puzzle game using Breadth-First Search in state space representation with blank tile movement.",
        runCommand: "python \"2. 8-puzzle problem using state-space representation.py\"",
        expectedOutput: `Solution Found
Number of moves: 5

Step 0
[1, 0, 3]
[4, 2, 6]
[7, 5, 8]
...
Step 5
[1, 2, 3]
[4, 5, 6]
[7, 8, 0]`,
        files: [
          {
            name: "2. 8-puzzle problem using state-space representation.py",
            lang: "python",
            icon: "py",
            content: `from collections import deque

goal_state = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]

def to_tuple(state):
    return tuple(tuple(row) for row in state)

def find_blank(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j

def get_neighbors(state):
    neighbors = []
    x, y = find_blank(state)
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]  
    for dx, dy in moves:
        new_x = x + dx
        new_y = y + dy
        if 0 <= new_x < 3 and 0 <= new_y < 3:
            new_state = [row[:] for row in state]
            new_state[x][y], new_state[new_x][new_y] = \\
                new_state[new_x][new_y], new_state[x][y]
            neighbors.append(new_state)
    return neighbors

def solve_puzzle(start_state):
    queue = deque()
    visited = set()
    queue.append((start_state, []))
    visited.add(to_tuple(start_state))
    while queue:
        current_state, path = queue.popleft()

        if current_state == goal_state:
            return path + [current_state]
        for neighbor in get_neighbors(current_state):
            if to_tuple(neighbor) not in visited:
                visited.add(to_tuple(neighbor))
                queue.append((neighbor, path + [current_state]))
    return None

def print_state(state):
    for row in state:
        print(row)
    print()

start_state = [
    [1, 0, 3],
    [4, 2, 6],
    [7, 5, 8]
]

solution = solve_puzzle(start_state)
if solution:
    print("Solution Found")
    print("Number of moves:", len(solution) - 1)
    for step, state in enumerate(solution):
        print("\\nStep", step)
        print_state(state)
else:
    print("No solution found.")
`
          }
        ]
      },
      {
        id: "aiml-3",
        num: 3,
        title: "A* Search Algorithm",
        category: "Informed Search",
        description: "Find the optimal path from source to goal using heuristic evaluation f(n) = g(n) + h(n) with priority queue.",
        runCommand: "python \"3. A search algorithm.py\"",
        expectedOutput: `Current Node : A
g(n) = 0
h(n) = 9
f(n) = 9
...
-------------------------
Optimal Path : A -> B -> D -> G
Total Cost   : 10`,
        files: [
          {
            name: "3. A search algorithm.py",
            lang: "python",
            icon: "py",
            content: `import heapq

graph = {
    'A': [('B', 2), ('C', 4)],
    'B': [('D', 7), ('E', 3)],
    'C': [('F', 2)],
    'D': [('G', 1)],
    'E': [('G', 5)],
    'F': [('G', 3)],
    'G': []
}

heuristic = {
    'A': 9,
    'B': 8,
    'C': 5,
    'D': 1,
    'E': 5,
    'F': 3,
    'G': 0
}

def astar(start, goal):
    queue = []
    heapq.heappush(queue, (heuristic[start], 0, start, [start]))
    visited = []
    
    while queue:
        f, g, current, path = heapq.heappop(queue)
        
        if current in visited:
            continue
            
        print("Current Node :", current)
        print("g(n) =", g)
        print("h(n) =", heuristic[current])
        print("f(n) =", f)
        print()
        
        visited.append(current)
        
        if current == goal:
            return path, g
            
        for neighbor, cost in graph[current]:
            if neighbor not in visited:
                new_g = g + cost
                new_f = new_g + heuristic[neighbor]
                heapq.heappush(queue, (new_f, new_g, neighbor, path + [neighbor]))
                
    return None, None

start = 'A'
goal = 'G'
path, cost = astar(start, goal)

print("-------------------------")
if path:
    print("Optimal Path :", " -> ".join(path))
    print("Total Cost   :", cost)
else:
    print("No path found.")
`
          }
        ]
      },
      {
        id: "aiml-4",
        num: 4,
        title: "Hill Climbing Algorithm",
        category: "Local Search Optimization",
        description: "Optimize an objective mathematical function f(x) = -x^2 + 10x using hill climbing local search to reach the peak value.",
        runCommand: "python \"4.  Hill Climbing algorithm.py\"",
        expectedOutput: `Current x = 0  Objective Value = 0
Current x = 1  Objective Value = 9
Current x = 2  Objective Value = 16
Current x = 3  Objective Value = 21
Current x = 4  Objective Value = 24
Current x = 5  Objective Value = 25

Best Solution Found
Optimal x = 5
Maximum Value = 25`,
        files: [
          {
            name: "4.  Hill Climbing algorithm.py",
            lang: "python",
            icon: "py",
            content: `# Objective Function 
def objective_function(x): 
    return -x * x + 10 * x 

# Hill Climbing Function 
def hill_climbing(start): 
    current = start 
    step_size = 1 
    
    while True: 
        # Generate neighboring solutions 
        left = current - step_size 
        right = current + step_size 
        
        # Evaluate current and neighboring states 
        current_value = objective_function(current) 
        left_value = objective_function(left) 
        right_value = objective_function(right) 
        
        # Display current state 
        print("Current x =", current, " Objective Value =", current_value) 
        
        # Move to the better neighboring state 
        if left_value > current_value: 
            current = left 
        elif right_value > current_value: 
            current = right 
        # Stop if no better neighbor exists 
        else: 
            return current, current_value 

# Main Program 
start_point = 0 
best_x, best_value = hill_climbing(start_point) 

print("\\nBest Solution Found") 
print("Optimal x =", best_x) 
print("Maximum Value =", best_value)
`
          }
        ]
      },
      {
        id: "aiml-5",
        num: 5,
        title: "Linear Regression Model",
        category: "Supervised Learning",
        description: "Build and train a Simple Linear Regression model with scikit-learn, predict new values, and plot the regression line using matplotlib.",
        runCommand: "python \"5.  Linear Regression model.py\"",
        expectedOutput: `Slope (m): 0.6
Intercept (c): 2.2
Predicted Price for 1525 sq.ft house: 917.2
[A Matplotlib plot of House Size vs House Price will be displayed]`,
        files: [
          {
            name: "5.  Linear Regression model.py",
            lang: "python",
            icon: "py",
            content: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Training data (Features: Size, Target: Price)
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
Y = np.array([2, 4, 5, 4, 5])

model = LinearRegression()
model.fit(X, Y)

predicted = model.predict(X)

print("Slope (m):", model.coef_[0])
print("Intercept (c):", model.intercept_)

# Predict price for a new house size
new_house = np.array([[1525]])
predicted_price = model.predict(new_house)
print("Predicted Price for 1525 sq.ft house:", predicted_price[0])

# Plotting the regression results
plt.scatter(X, Y, color="blue", label="Actual Data")
plt.plot(X, predicted, color="red", linewidth=2, label="Regression Line")
plt.title("House Size vs House Price")
plt.xlabel("House Size (sq.ft)")
plt.ylabel("House Price (Lakhs)")
plt.legend()
plt.show()
`
          }
        ]
      },
      {
        id: "aiml-6",
        num: 6,
        title: "Logistic Regression Classifier",
        category: "Classification & NLP",
        description: "Train a binary text classification model using CountVectorizer and Logistic Regression to categorize emails as Spam or Not Spam.",
        runCommand: "python \"6.  Logistic Regression classifier.py\"",
        expectedOutput: `===== TRAINING DATA =====
Congratulations! You won a free lottery --> Spam
Claim your prize now --> Spam
Limited time offer --> Spam
Meeting at 10 AM tomorrow --> Not Spam
Project report submission --> Not Spam
Please attend the class today --> Not Spam

===== TESTING DATA =====
Free prize available now

===== PREDICTION =====
[1]

===== RESULT =====
The email is classified as SPAM.`,
        files: [
          {
            name: "6.  Logistic Regression classifier.py",
            lang: "python",
            icon: "py",
            content: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

# -----------------------------
# Training Data
# -----------------------------
train_emails = [
    "Congratulations! You won a free lottery",
    "Claim your prize now",
    "Limited time offer",
    "Meeting at 10 AM tomorrow",
    "Project report submission",
    "Please attend the class today"
]

# 1 = Spam, 0 = Not Spam
train_labels = [1, 1, 1, 0, 0, 0]

print("===== TRAINING DATA =====")
for email, label in zip(train_emails, train_labels):
    print(email, "-->", "Spam" if label == 1 else "Not Spam")

# Convert text into numerical features
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_emails)

# Train Logistic Regression Model
model = LogisticRegression()
model.fit(X_train, train_labels)

# -----------------------------
# Testing Data
# -----------------------------
test_email = ["Free prize available now"]

print("\\n===== TESTING DATA =====")
print(test_email[0])

X_test = vectorizer.transform(test_email)

# -----------------------------
# Prediction
# -----------------------------
prediction = model.predict(X_test)

print("\\n===== PREDICTION =====")
print(prediction)

# -----------------------------
# Result
# -----------------------------
print("\\n===== RESULT =====")
if prediction[0] == 1:
    print("The email is classified as SPAM.")
else:
    print("The email is classified as NOT SPAM.")
`
          }
        ]
      },
      {
        id: "aiml-7",
        num: 7,
        title: "Support Vector Machine (SVM)",
        category: "Supervised Learning",
        description: "Classify Iris flower species using Support Vector Classifier (SVC) and evaluate Accuracy, Precision, Recall, F1-Score, and Confusion Matrix.",
        runCommand: "python \"7. Support Vector Machine (SVM).py\"",
        expectedOutput: `===== IRIS DATASET =====
Classes: ['setosa' 'versicolor' 'virginica']
Total Samples: 150

===== TRAINING AND TESTING =====
Training Samples: 120
Testing Samples : 30

===== PERFORMANCE =====
Accuracy  : 96.67 %
Precision : 0.9704
Recall    : 0.9667
F1-Score  : 0.9666

===== CONFUSION MATRIX =====
[[10  0  0]
 [ 0  9  1]
 [ 0  0 10]]`,
        files: [
          {
            name: "7. Support Vector Machine (SVM).py",
            lang: "python",
            icon: "py",
            content: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score
)

# Load Iris flower dataset
iris = load_iris()

X = iris.data
y = iris.target

print("===== IRIS DATASET =====")
print("Classes:", iris.target_names)
print("Total Samples:", len(X))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2
)

print("\\n===== TRAINING AND TESTING =====")
print("Training Samples:", len(X_train))
print("Testing Samples :", len(X_test))

# Train SVM Model
model = SVC(kernel='linear')
model.fit(X_train, y_train)

# Evaluate on test set
y_pred = model.predict(X_test)

print("\\n===== PREDICTION =====")
print("Actual Classes   :", y_test)
print("Predicted Classes:", y_pred)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')
cm = confusion_matrix(y_test, y_pred)

print("\\n===== PERFORMANCE =====")
print("Accuracy  :", round(accuracy * 100, 2), "%")
print("Precision :", round(precision, 4))
print("Recall    :", round(recall, 4))
print("F1-Score  :", round(f1, 4))

print("\\n===== CONFUSION MATRIX =====")
print(cm)
`
          }
        ]
      },
      {
        id: "aiml-8",
        num: 8,
        title: "K-Nearest Neighbors (KNN) Classifier",
        category: "Classification & Preprocessing",
        description: "Train a KNN model on Loan eligibility dataset, handle missing values, encode labels, standardize features with StandardScaler, and predict loan status.",
        runCommand: "python \"8. K-Nearest Neighbors (KNN).py\"",
        expectedOutput: `===== LOAN DATASET =====
Total Records: 100
Records after removing missing values: 100

===== MODEL PERFORMANCE =====
KNN Accuracy: 80.0 %

===== NEW APPLICANT =====
Loan Status: Approved`,
        files: [
          {
            name: "8. K-Nearest Neighbors (KNN).py",
            lang: "python",
            icon: "py",
            content: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

# Load dataset (make sure loan_data_100_records.csv is in the same directory)
# Or reference "Student_043_Loan_Data.csv" / "loan_data_100_records.csv"
try:
    data = pd.read_csv("loan_data_100_records.csv")
except FileNotFoundError:
    data = pd.read_csv("Student_043_Loan_Data.csv")

print("===== LOAN DATASET =====")
print(data.head())
print("\\nTotal Records:", len(data))

# Select relevant columns
data = data[
    ["ApplicantIncome", "LoanAmount", "Credit_History", "Loan_Status"]
]

data = data.dropna()
print("\\nRecords after removing missing values:", len(data))

# Encode target variable
encoder = LabelEncoder()
data["Loan_Status"] = encoder.fit_transform(data["Loan_Status"])

X = data[["ApplicantIncome", "LoanAmount", "Credit_History"]]
y = data["Loan_Status"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\\nTraining Samples:", len(X_train))
print("Testing Samples :", len(X_test))

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train KNN Model
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train_scaled, y_train)

y_pred = knn.predict(X_test_scaled)
print("\\n===== ACTUAL VS PREDICTED =====")
result_table = pd.DataFrame({
    "Actual": y_test.values,
    "Predicted": y_pred
})
print(result_table.head())

accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print("\\n===== MODEL PERFORMANCE =====")
print("KNN Accuracy:", round(accuracy * 100, 2), "%")
print("\\nConfusion Matrix:")
print(cm)

# Predict for a new applicant
new_data = pd.DataFrame(
    [[5000, 150, 1]],
    columns=["ApplicantIncome", "LoanAmount", "Credit_History"]
)

print("\\n===== NEW APPLICANT =====")
print(new_data)

new_data_scaled = scaler.transform(new_data)
prediction = knn.predict(new_data_scaled)
loan_status = encoder.inverse_transform(prediction)

if loan_status[0] == "Y":
    print("\\nLoan Status: Approved")
else:
    print("\\nLoan Status: Not Approved")
`
          },
          {
            name: "loan_data_100_records.csv",
            lang: "csv",
            icon: "csv",
            content: `ApplicantIncome,LoanAmount,Credit_History,Loan_Status
12476,107,1,Y
6506,175,1,Y
14066,102,1,Y
10935,94,1,Y
2520,65,1,Y
11863,63,1,Y
13731,382,0,Y
9359,351,1,N
14432,462,1,Y
6552,129,1,Y
14509,222,1,Y
8224,99,1,Y
7635,359,1,Y
9527,324,1,N
3291,332,1,N
7925,345,1,Y
12834,166,0,N
5814,493,1,Y
12415,477,1,Y
5432,393,1,N`
          }
        ]
      },
      {
        id: "aiml-9",
        num: 9,
        title: "Feedforward Neural Network (ANN)",
        category: "Deep Learning",
        description: "Construct a multi-layer deep neural network with TensorFlow/Keras to predict diabetes risk using health parameters.",
        runCommand: "python \"9.  Feedforward Neural Network.py\"",
        expectedOutput: `Training Samples: 16
Testing Samples : 4

===== MODEL PERFORMANCE =====
Test Accuracy: 100.0 %

===== NEW PATIENT =====
Glucose Level : 150
BMI           : 34.0
Age           : 55

===== PREDICTION =====
Model Output: 0.9421
Diabetes Risk: High Risk`,
        files: [
          {
            name: "9.  Feedforward Neural Network.py",
            lang: "python",
            icon: "py",
            content: `# Feedforward Neural Network using TensorFlow
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Create Dataset; Features: Glucose Level, BMI, Age
X = np.array([
    [85, 22.0, 25],
    [90, 23.5, 30],
    [95, 24.0, 28],
    [100, 25.5, 35],
    [105, 26.0, 40],
    [110, 27.5, 45],
    [115, 28.0, 38],
    [120, 29.5, 50],
    [125, 30.0, 42],
    [130, 31.5, 48],
    [135, 32.0, 55],
    [140, 33.0, 52],
    [145, 34.0, 58],
    [150, 35.0, 60],
    [155, 36.0, 62],
    [160, 37.0, 65],
    [165, 38.0, 57],
    [170, 39.0, 68],
    [175, 40.0, 70],
    [180, 41.0, 72]
])

# Target: 0 = Low Risk, 1 = High Risk
y = np.array([
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1
])

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training Samples:", len(X_train))
print("Testing Samples :", len(X_test))

# Scale the Features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create Feedforward Neural Network
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(3,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

# Compile the Model
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

# Train the Model
model.fit(
    X_train_scaled,
    y_train,
    epochs=50,
    batch_size=4,
    verbose=0
)

# Evaluate the Model
loss, accuracy = model.evaluate(
    X_test_scaled,
    y_test,
    verbose=0
)

print("\\n===== MODEL PERFORMANCE =====")
print("Test Accuracy:", round(accuracy * 100, 2), "%")

# Enter New Patient Data
new_patient = np.array([
    [150, 34.0, 55]
])

print("\\n===== NEW PATIENT =====")
print("Glucose Level : 150")
print("BMI           : 34.0")
print("Age           : 55")

new_patient_scaled = scaler.transform(new_patient)

# Predict
prediction = model.predict(
    new_patient_scaled,
    verbose=0
)

probability = prediction[0][0]

print("\\n===== PREDICTION =====")
print("Model Output:", round(float(probability), 4))

if probability >= 0.5:
    print("Diabetes Risk: High Risk")
else:
    print("Diabetes Risk: Low Risk")
`
          }
        ]
      },
      {
        id: "aiml-10",
        num: 10,
        title: "Convolutional Neural Network (CNN)",
        category: "Computer Vision & Deep Learning",
        description: "Build and train a 2D CNN model with Conv2D, MaxPooling2D, and Dense layers on MNIST handwritten digit dataset.",
        runCommand: "python \"10. Convolutional Neural Network (CNN).py\"",
        expectedOutput: `===== MNIST DATASET SUMMARY =====
Total Training Images : 60000
Total Testing Images  : 10000
Image Size            : 28 x 28
Number of Classes     : 10

===== MODEL PERFORMANCE =====
Test Accuracy: 94.2 %

===== DIGIT PREDICTION =====
Actual Digit   : 7
Predicted Digit: 7`,
        files: [
          {
            name: "10. Convolutional Neural Network (CNN).py",
            lang: "python",
            icon: "py",
            content: `# Convolutional Neural Network using TensorFlow
# Handwritten Digit Classification using MNIST Dataset

import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import random

# Load MNIST Dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

# Display Dataset Summary
print("===== MNIST DATASET SUMMARY =====")
print("Total Training Images :", len(X_train))
print("Total Testing Images  :", len(X_test))
print("Image Size            :", X_train.shape[1], "x", X_train.shape[2])
print("Number of Classes     : 10")
print("Classes               : 0 to 9")

# Display Sample Images
plt.figure(figsize=(8, 4))
for i in range(10):
    plt.subplot(2, 5, i + 1)
    plt.imshow(X_train[i], cmap="gray")
    plt.title("Digit: " + str(y_train[i]))
    plt.axis("off")

plt.suptitle("Sample MNIST Handwritten Digits")
plt.tight_layout()
plt.show()

# Use Smaller Dataset for Faster Execution
X_train = X_train[:2000]
y_train = y_train[:2000]
X_test = X_test[:500]
y_test = y_test[:500]

print("\\n===== DATA USED =====")
print("Training Images :", len(X_train))
print("Testing Images  :", len(X_test))

# Normalize Images to [0, 1]
X_train = X_train / 255.0
X_test = X_test / 255.0

# Add Channel Dimension
X_train = X_train.reshape(-1, 28, 28, 1)
X_test = X_test.reshape(-1, 28, 28, 1)

# Create CNN Model
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(28, 28, 1)),
    tf.keras.layers.Conv2D(16, (3, 3), activation="relu"),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])

# Compile Model
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train Model
print("\\n===== MODEL TRAINING =====")
model.fit(
    X_train,
    y_train,
    epochs=2,
    batch_size=64
)

# Evaluate Model
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print("\\n===== MODEL PERFORMANCE =====")
print("Test Accuracy:", round(accuracy * 100, 2), "%")

# Select a Random Test Image
index = random.randint(0, len(X_test) - 1)

# Predict the Random Image
prediction = model.predict(X_test[index:index + 1], verbose=0)
predicted_digit = np.argmax(prediction[0])
actual_digit = y_test[index]

# Display Prediction
print("\\n===== DIGIT PREDICTION =====")
print("Test Image No. :", index)
print("Actual Digit   :", actual_digit)
print("Predicted Digit:", predicted_digit)

# Display the Random Test Image
plt.imshow(X_test[index].reshape(28, 28), cmap="gray")
plt.title(f"Actual: {actual_digit}\\nPredicted: {predicted_digit}")
plt.axis("off")
plt.show()
`
          }
        ]
      }
    ]
  },

  osc: {
    id: "osc",
    title: "Open Source & Web Technologies (OSC)",
    shortName: "OSC",
    badge: "7 Practicals",
    description: "Web development and server-side scripting practicals spanning JavaScript, PHP, MySQL, Node.js, Express, and MongoDB with clean formatting.",
    programs: [
      {
        id: "osc-1",
        num: 1,
        title: "Image Slideshow",
        category: "Client-Side Web Development",
        description: "Create an automatic, timed image slideshow component using HTML5, CSS3 flexbox centering, and JavaScript setInterval timer.",
        runCommand: "Open index.html in any modern browser (ensure ./assets/ contains image files)",
        expectedOutput: "An image slideshow that automatically cycles through images every 2000 milliseconds (2 seconds) smoothly.",
        files: [
          {
            name: "index.html",
            lang: "html",
            icon: "html",
            content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Slideshow</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <img src="./assets/img1.jpg" alt="Slideshow Image" id="slide_show" class="image" />
  <script src="./app.js"></script>
</body>
</html>`
          },
          {
            name: "style.css",
            lang: "css",
            icon: "css",
            content: `.image {
  height: 500px;
  width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}`
          },
          {
            name: "app.js",
            lang: "javascript",
            icon: "js",
            content: `let images = [
  "./assets/img1.jpg",
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./assets/img4.avif"
];

let index = 0;
let slide = document.getElementById('slide_show');

let changeimg = () => {
  index++; // Move to next image index
  if (index >= images.length) {
    index = 0; // Loop back to the first image
  }
  slide.src = images[index];
};

// Change slide every 2 seconds
setInterval(changeimg, 2000);`
          }
        ]
      },
      {
        id: "osc-2",
        num: 2,
        title: "Electricity Bill Calculator",
        category: "Server-Side Scripting (PHP)",
        description: "Interactive TNEB electricity slab tariff billing calculator created using PHP form processing, energy charge algorithms, and styled invoice table.",
        runCommand: "Place in XAMPP htdocs folder and visit http://localhost/electricity_bill.php",
        expectedOutput: "A bill card displaying Consumer Name, Units Consumed, Energy Charges (first 100 units @ ₹2.50, remaining @ ₹3.50), Fixed Charges ₹50.00, and Total Amount.",
        files: [
          {
            name: "electricity_bill.php",
            lang: "php",
            icon: "php",
            content: `<?php 
// Initialize variables
$show_bill = false; 
$name = ""; 
$units = ""; 
$energy_charges = 0; 
$fixed_charges = 50.00; 
$total_amount = 0; 

if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $name = htmlspecialchars($_POST['consumer_name']); 
    $units = (int)$_POST['units']; 

    // Calculation Logic:
    // First 100 units @ ₹ 2.50
    // Remaining units @ ₹ 3.50
    if ($units <= 100) { 
        $energy_charges = $units * 2.50; 
    } else { 
        $energy_charges = (100 * 2.50) + (($units - 100) * 3.50);
    } 

    $total_amount = $energy_charges + $fixed_charges; 
    $show_bill = true; 
} 
?> 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Electricity Bill Generator</title> 
    <style> 
        body { 
            background-color: #eaf5fa; 
            font-family: Arial, sans-serif; 
            color: #00334e; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding-top: 40px; 
            margin: 0; 
        } 
        h1 { 
            color: #003b5c; 
            margin-bottom: 30px; 
        } 
        .form-table { 
            border-spacing: 0 15px; 
        } 
        .form-table td { 
            padding: 0 10px; 
        } 
        .form-table label { 
            font-weight: bold; 
            color: #003b5c; 
        } 
        .form-table input { 
            padding: 8px; 
            border: 1px solid #a8c6d9; 
            border-radius: 3px; 
            width: 170px; 
            font-size: 14px; 
        } 
        .btn-container { 
            text-align: center; 
            margin-top: 10px; 
        } 
        .submit-btn { 
            padding: 6px 15px; 
            background-color: #f7fbfc; 
            border: 1px solid #7094a8; 
            color: #003b5c; 
            border-radius: 3px; 
            cursor: pointer; 
            font-size: 14px; 
        } 
        .submit-btn:hover { 
            background-color: #dbeaf1; 
        } 
        .bill-container { 
            margin-top: 40px; 
            background-color: #ffffff; 
            border: 2px solid #1c4b66; 
            padding: 30px 40px; 
            width: 420px; 
            box-sizing: border-box; 
            box-shadow: 2px 2px 5px rgba(0,0,0,0.05); 
        } 
        .bill-title { 
            text-align: center; 
            font-size: 20px; 
            font-weight: bold; 
            color: #003b5c; 
            text-transform: uppercase; 
            margin-bottom: 20px; 
        } 
        hr { 
            border: 0; 
            border-top: 1px solid #cbd6dd; 
            margin: 15px 0; 
        } 
        .bill-details { 
            width: 100%; 
            border-collapse: collapse; 
        } 
        .bill-details td { 
            padding: 8px 0; 
            font-size: 15px; 
        } 
        .bill-details td:first-child { 
            font-weight: bold; 
            color: #003b5c; 
            width: 60%; 
        } 
        .bill-details td:last-child { 
            color: #2c5973; 
        } 
        .total-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 5px 0; 
            color: #922036; 
            font-size: 17px; 
            font-weight: bold; 
        } 
        .footer-msg { 
            text-align: center; 
            font-size: 13px; 
            font-weight: bold; 
            color: #003b5c; 
            margin-top: 20px; 
        } 
    </style> 
</head> 
<body> 
    <h1>Electricity Bill Generator</h1> 
    <form method="POST" action=""> 
        <table class="form-table"> 
            <tr> 
                <td align="right"><label for="consumer_name">Consumer Name</label></td> 
                <td><input type="text" id="consumer_name" name="consumer_name" 
                    value="<?php echo htmlspecialchars($name); ?>" required></td> 
            </tr> 
            <tr> 
                <td align="right"><label for="units">Units Consumed</label></td> 
                <td><input type="number" id="units" name="units" value="<?php echo 
                    htmlspecialchars($units); ?>" required min="0"></td> 
            </tr> 
        </table> 
        <div class="btn-container"> 
            <button type="submit" class="submit-btn">Generate Bill</button> 
        </div> 
    </form> 

    <?php if ($show_bill): ?> 
    <div class="bill-container"> 
        <div class="bill-title">TNEB ELECTRICITY BILL</div> 
        <hr> 
        <table class="bill-details"> 
            <tr> 
                <td>Consumer Name</td> 
                <td><?php echo htmlspecialchars($name); ?></td> 
            </tr> 
            <tr> 
                <td>Units Consumed</td> 
                <td><?php echo $units; ?> Units</td> 
            </tr> 
            <tr> 
                <td>Energy Charges</td> 
                <td>₹ <?php echo number_format($energy_charges, 2); ?></td> 
            </tr> 
            <tr> 
                <td>Fixed Charges</td> 
                <td>₹ <?php echo number_format($fixed_charges, 2); ?></td> 
            </tr> 
        </table> 
        <hr> 
        <div class="total-row"> 
            <span>Total Bill Amount</span> 
            <span>₹ <?php echo number_format($total_amount, 2); ?></span> 
        </div> 
        <hr> 
        <div class="footer-msg">Thank You - Pay Before Due Date</div> 
    </div> 
    <?php endif; ?> 
</body> 
</html>`
          }
        ]
      },
      {
        id: "osc-3",
        num: 3,
        title: "Feedback Form with MySQL Database",
        category: "Full Stack (PHP + MySQL)",
        description: "Submit and store user feedbacks into a MySQL relational database via PHP mysqli, and retrieve submissions in a responsive tabular view.",
        runCommand: "Setup database 'feedbackdb', configure db.php, and open index.php in your local PHP server",
        expectedOutput: "Successful submission alert popup upon form submission, and table displaying all recorded feedbacks in view.php.",
        files: [
          {
            name: "db.php",
            lang: "php",
            icon: "php",
            content: `<?php 
$servername = "localhost"; 
$username   = "root"; 
$password   = ""; 
$database   = "feedbackdb"; 

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database); 

// Check connection
if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error()); 
} 
?>`
          },
          {
            name: "index.php",
            lang: "php",
            icon: "php",
            content: `<?php 
include("db.php"); 

if (isset($_POST['submit'])) { 
    $name    = mysqli_real_escape_string($conn, $_POST['name']); 
    $email   = mysqli_real_escape_string($conn, $_POST['email']); 
    $message = mysqli_real_escape_string($conn, $_POST['message']); 

    $sql = "INSERT INTO feedback(name, email, message) VALUES ('$name', '$email', '$message')"; 
    if (mysqli_query($conn, $sql)) { 
        echo "<script>alert('Feedback submitted Successfully');</script>"; 
    } else { 
        echo "Error: " . mysqli_error($conn); 
    } 
} 
?> 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Feedback System</title> 
    <style> 
        body { 
            font-family: Arial, sans-serif; 
            background-color: #f2f2f2; 
            margin: 0; 
            padding: 0; 
        } 
        form { 
            width: 400px; 
            margin: 80px auto 20px; 
            padding: 30px; 
            background-color: white; 
            border-radius: 10px; 
            box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        } 
        h2 { 
            text-align: center; 
            margin-bottom: 25px; 
        } 
        label { 
            display: block; 
            margin-top: 15px; 
            margin-bottom: 6px; 
            font-weight: bold; 
        } 
        input[type="text"], 
        input[type="email"], 
        textarea { 
            width: 100%; 
            padding: 10px; 
            border: 1px solid #ccc; 
            border-radius: 5px; 
            box-sizing: border-box; 
            font-size: 14px; 
        } 
        textarea { 
            resize: vertical; 
        } 
        input[type="submit"] { 
            width: 100%; 
            padding: 12px; 
            margin-top: 20px; 
            border: none; 
            border-radius: 5px; 
            background-color: #333; 
            color: white; 
            font-size: 16px; 
            cursor: pointer; 
        } 
        input[type="submit"]:hover { 
            background-color: #555; 
        } 
        a { 
            display: block; 
            width: 400px; 
            margin: 10px auto; 
            text-align: center; 
            text-decoration: none; 
            color: #333; 
            font-weight: bold; 
        } 
        a:hover { 
            text-decoration: underline; 
        } 
    </style> 
</head> 
<body> 
    <form action="" method="post"> 
        <h2>Feedback Form</h2> 
        <label>Name</label> 
        <input type="text" name="name" required> 
        <label>Email</label> 
        <input type="email" name="email" required> 
        <label>Feedback</label> 
        <textarea name="message" rows="5" required></textarea> 
        <input type="submit" name="submit" value="Submit Feedback" /> 
    </form> 
    <a href="./view.php">View Data</a> 
</body> 
</html>`
          },
          {
            name: "view.php",
            lang: "php",
            icon: "php",
            content: `<?php 
include("db.php"); 
?> 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>View Feedback</title> 
    <style> 
        * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif; 
        } 
        body { 
            background: #f4f6f9; 
            padding: 40px 20px; 
        } 
        .container { 
            max-width: 1000px; 
            margin: auto; 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.1); 
        } 
        h1 { 
            text-align: center; 
            color: #333; 
            margin-bottom: 25px; 
        } 
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 25px; 
        } 
        th { 
            background: #333; 
            color: white; 
            padding: 14px; 
            text-align: left; 
        } 
        td { 
            padding: 12px 14px; 
            border-bottom: 1px solid #ddd; 
            color: #444; 
        } 
        tr:hover { 
            background: #f5f5f5; 
        } 
        .back-btn { 
            display: inline-block; 
            text-decoration: none; 
            background: #333; 
            color: white; 
            padding: 10px 18px; 
            border-radius: 6px; 
        } 
        .back-btn:hover { 
            background: #555; 
        } 
        @media (max-width: 700px) { 
            .container { 
                padding: 15px; 
                overflow-x: auto; 
            } 
            table { 
                min-width: 600px; 
            } 
        } 
    </style> 
</head> 
<body> 
    <div class="container"> 
        <h1>Feedback Details</h1> 
        <table> 
            <tr> 
                <th>ID</th> 
                <th>Name</th> 
                <th>Email</th> 
                <th>Message</th> 
            </tr> 
            <?php 
            $sql = "SELECT * FROM feedback"; 
            $result = mysqli_query($conn, $sql); 
            while($row = mysqli_fetch_assoc($result)) { 
            ?> 
            <tr> 
                <td><?php echo $row['id']; ?></td> 
                <td><?php echo htmlspecialchars($row['name']); ?></td> 
                <td><?php echo htmlspecialchars($row['email']); ?></td> 
                <td><?php echo htmlspecialchars($row['message']); ?></td> 
            </tr> 
            <?php 
            } 
            ?> 
        </table> 
        <a href="./index.php" class="back-btn">&larr; Back to Form</a> 
    </div> 
</body> 
</html>`
          }
        ]
      },
      {
        id: "osc-4",
        num: 4,
        title: "User Authentication & Login System",
        category: "PHP & Session Security",
        description: "User authentication system with PHP sessions, MySQL credential verification, protected dashboard page, and session destroy logout mechanism.",
        runCommand: "Setup database 'login' with table 'user', open login.php in browser",
        expectedOutput: "Valid credentials redirect to dashboard.php displaying 'Welcome, [username]'. Invalid credentials show error box.",
        files: [
          {
            name: "db.php",
            lang: "php",
            icon: "php",
            content: `<?php 
$servername = "localhost"; 
$username   = "root"; 
$password   = ""; 
$database   = "login"; 
$port       = 3308; // Adjust to 3306 or 3308 depending on your local MySQL server

$conn = mysqli_connect($servername, $username, $password, $database, $port); 

if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error()); 
} 
?>`
          },
          {
            name: "login.php",
            lang: "php",
            icon: "php",
            content: `<?php 
session_start(); 
include('db.php'); 

if (isset($_POST['submit'])) { 
    $username = mysqli_real_escape_string($conn, $_POST['username']); 
    $password = mysqli_real_escape_string($conn, $_POST['password']); 

    $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'"; 
    $result = mysqli_query($conn, $sql); 

    if (mysqli_num_rows($result) == 1) { 
        $_SESSION["username"] = $username; 
        header("Location: dashboard.php"); 
        exit(); 
    } else { 
        $error = "Invalid username or password"; 
    } 
} 
?> 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>User Login</title> 
    <style> 
        * { 
            box-sizing: border-box; 
            font-family: Arial, sans-serif; 
        } 
        body { 
            margin: 0; 
            background: #f5f3e8; 
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
        } 
        .login-box { 
            width: 380px; 
            background: white; 
            padding: 35px; 
            border-radius: 10px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.12); 
        } 
        h2 { 
            text-align: center; 
            color: #315c45; 
            margin-bottom: 25px; 
        } 
        label { 
            display: block; 
            margin-bottom: 7px; 
            color: #444; 
        } 
        input[type="text"], 
        input[type="password"] { 
            width: 100%; 
            padding: 11px; 
            margin-bottom: 18px; 
            border: 1px solid #ccc; 
            border-radius: 5px; 
        } 
        input:focus { 
            outline: none; 
            border-color: #315c45; 
        } 
        .login-btn { 
            width: 100%; 
            padding: 12px; 
            background: #315c45; 
            color: white; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 15px; 
        } 
        .login-btn:hover { 
            background: #264936; 
        } 
        .error { 
            background: #f8dddd; 
            color: #a33a3a; 
            padding: 10px; 
            margin-bottom: 18px; 
            border-radius: 5px; 
            text-align: center; 
        } 
    </style> 
</head> 
<body> 
    <div class="login-box"> 
        <h2>User Login</h2> 
        <?php if (isset($error)) { ?> 
            <div class="error"><?php echo $error; ?></div> 
        <?php } ?> 
        <form method="post"> 
            <label>Username</label> 
            <input type="text" name="username" placeholder="Enter username" required> 
            <label>Password</label> 
            <input type="password" name="password" placeholder="Enter password" required> 
            <input type="submit" name="submit" value="Login" class="login-btn"> 
        </form> 
    </div> 
</body> 
</html>`
          },
          {
            name: "dashboard.php",
            lang: "php",
            icon: "php",
            content: `<?php 
session_start(); 
if (!isset($_SESSION['username'])) { 
    header("Location: login.php"); 
    exit(); 
} 
?> 
<!DOCTYPE html> 
<html lang="en"> 
<head>   
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Dashboard</title> 
    <style> 
        * { 
            box-sizing: border-box; 
            font-family: Arial, sans-serif; 
        } 
        body { 
            margin: 0; 
            background: #f5f3e8; 
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
        } 
        .dashboard { 
            width: 420px; 
            background: white; 
            padding: 40px; 
            text-align: center; 
            border-radius: 10px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.12); 
        } 
        .dashboard h1 { 
            color: #315c45; 
            margin-bottom: 10px; 
        } 
        .dashboard p { 
            color: #666;   
            margin-bottom: 30px; 
        } 
        .logout { 
            display: inline-block; 
            padding: 11px 30px; 
            background: #315c45; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
        } 
        .logout:hover { 
            background: #264936; 
        } 
    </style> 
</head> 
<body> 
    <div class="dashboard"> 
        <h1>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></h1> 
        <p>You have successfully logged in.</p> 
        <a href="logout.php" class="logout">Logout</a> 
    </div>   
</body> 
</html>`
          },
          {
            name: "logout.php",
            lang: "php",
            icon: "php",
            content: `<?php 
session_start(); 
session_destroy(); 
header("Location: login.php"); 
exit(); 
?>`
          }
        ]
      },
      {
        id: "osc-5",
        num: 5,
        title: "Create and Read a Text File in Node.js",
        category: "Node.js File System (fs)",
        description: "Asynchronously write employee data to a text file using Node.js fs.writeFile and read the file content using fs.readFile.",
        runCommand: "node \"5. create a text file\"",
        expectedOutput: `File created successfully!
File Content:
Employee Name: 'pavithra',
Employee ID: '001';`,
        files: [
          {
            name: "app.js",
            lang: "javascript",
            icon: "js",
            content: `const fs = require('fs');

const file1 = "page.txt";
const data = \`Employee Name: 'pavithra',
Employee ID: '001';\`;

// Step 1: Write data to the text file
fs.writeFile(file1, data, function (err) {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File created successfully!");

  // Step 2: Read and display data from the text file
  fs.readFile(file1, 'utf8', (err, fileData) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File Content:");
    console.log(fileData);
  });
});`
          }
        ]
      },
      {
        id: "osc-6",
        num: 6,
        title: "Student Registration System",
        category: "Express.js Full Stack App",
        description: "Full-featured multi-page Student Registration application with express-session authentication, regex input validation, and dynamic JSON API data fetching.",
        runCommand: "npm install express express-session && node app.js (Visit http://localhost:3000)",
        expectedOutput: `Server running at http://localhost:3000
Default Admin credentials:
Username: admin
Password: 1234
Registration form with validation, redirects to /student on success.`,
        files: [
          {
            name: "app.js",
            lang: "javascript",
            icon: "js",
            content: `const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "student-registration-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Login page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Login POST Handler
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    req.session.loggedIn = true;
    res.redirect("/register");
  } else {
    res.send(\`
      <h2>Invalid username or password</h2>
      <a href="/">Back to Login</a>
    \`);
  }
});

// Registration page route
app.get("/register", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/");
  }
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Handle student registration
app.post("/register", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/");
  }
  const {
    name,
    regno,
    email,
    mobile,
    gender,
    dob,
    department,
    course,
    year,
    address,
    skills,
  } = req.body;

  // Validation
  if (
    !name ||
    !regno ||
    !email ||
    !mobile ||
    !gender ||
    !dob ||
    !department ||
    !course ||
    !year ||
    !address
  ) {
    return res.send(\`
      <h2>All required fields must be filled.</h2>
      <a href="/register">Go Back</a>
    \`);
  }

  // Email validation regex
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.send(\`
      <h2>Invalid email address.</h2>
      <a href="/register">Go Back</a>
    \`);
  }

  // Mobile validation regex
  const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobile)) {
    return res.send(\`
      <h2>Mobile number must contain exactly 10 digits.</h2>
      <a href="/register">Go Back</a>
    \`);
  }

  // Store student details in session
  req.session.student = {
    name,
    regno,
    email,
    mobile,
    gender,
    dob,
    department,
    course,
    year,
    address,
    skills: skills || "None",
  };
  res.redirect("/student");
});

// Display student details page
app.get("/student", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/");
  }
  if (!req.session.student) {
    return res.redirect("/register");
  }
  res.sendFile(path.join(__dirname, "views", "student.html"));
});

// Student data API endpoint
app.get("/student-data", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.session.student);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`
          },
          {
            name: "views/login.html",
            lang: "html",
            icon: "html",
            content: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Registration - Login</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="container">
    <h1>Student Registration System</h1>
    <h2>Login</h2>
    <form action="/login" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required />

      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Login</button>
    </form>
    <p class="info">
      Username: <b>admin</b><br />
      Password: <b>1234</b>
    </p>
  </div>
</body>
</html>`
          },
          {
            name: "views/register.html",
            lang: "html",
            icon: "html",
            content: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Registration</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="container">
    <h1>Student Registration Form</h1>
    <form action="/register" method="POST">
      <label>Student Name</label>
      <input type="text" name="name" required />

      <label>Register Number</label>
      <input type="text" name="regno" required />

      <label>Email</label>
      <input type="email" name="email" required />

      <label>Mobile Number</label>
      <input
        type="text"
        name="mobile"
        pattern="[0-9]{10}"
        maxlength="10"
        placeholder="10-digit mobile number"
        required
      />

      <label>Gender</label>
      <div class="radio">
        <label><input type="radio" name="gender" value="Male" required /> Male</label>
        <label><input type="radio" name="gender" value="Female" /> Female</label>
        <label><input type="radio" name="gender" value="Other" /> Other</label>
      </div>

      <label>Date of Birth</label>
      <input type="date" name="dob" required />

      <label>Department</label>
      <select name="department" required>
        <option value="">Select Department</option>
        <option value="Computer Applications">Computer Applications</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Electronics">Electronics</option>
      </select>

      <label>Course</label>
      <select name="course" required>
        <option value="">Select Course</option>
        <option value="MCA">MCA</option>
        <option value="M.Sc Computer Science">M.Sc Computer Science</option>
        <option value="BCA">BCA</option>
        <option value="B.Sc Computer Science">B.Sc Computer Science</option>
      </select>

      <label>Year</label>
      <select name="year" required>
        <option value="">Select Year</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
      </select>

      <label>Address</label>
      <textarea name="address" rows="4" required></textarea>

      <label>Skills</label>
      <div class="skills">
        <label><input type="checkbox" name="skills" value="Python" /> Python</label>
        <label><input type="checkbox" name="skills" value="Java" /> Java</label>
        <label><input type="checkbox" name="skills" value="JavaScript" /> JavaScript</label>
        <label><input type="checkbox" name="skills" value="HTML/CSS" /> HTML/CSS</label>
        <label><input type="checkbox" name="skills" value="Node.js" /> Node.js</label>
      </div>

      <button type="submit">Register Student</button>
    </form>
    <a class="logout" href="/logout">Logout</a>
  </div>
</body>
</html>`
          },
          {
            name: "views/student.html",
            lang: "html",
            icon: "html",
            content: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Details</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="container">
    <h1>Student Registration Successful</h1>
    <div id="studentDetails">Loading student details...</div>
    <br />
    <a class="button" href="/register">Register Another Student</a>
    <a class="logout" href="/logout">Logout</a>
  </div>

  <script>
    fetch("/student-data")
      .then((response) => response.json())
      .then((student) => {
        const skillsDisplay = Array.isArray(student.skills) 
          ? student.skills.join(", ") 
          : (student.skills || "None");

        document.getElementById("studentDetails").innerHTML = \`
          <table>
            <tr><th>Student Name</th><td>\${student.name}</td></tr>
            <tr><th>Register Number</th><td>\${student.regno}</td></tr>
            <tr><th>Email</th><td>\${student.email}</td></tr>
            <tr><th>Mobile Number</th><td>\${student.mobile}</td></tr>
            <tr><th>Gender</th><td>\${student.gender}</td></tr>
            <tr><th>Date of Birth</th><td>\${student.dob}</td></tr>
            <tr><th>Department</th><td>\${student.department}</td></tr>
            <tr><th>Course</th><td>\${student.course}</td></tr>
            <tr><th>Year</th><td>\${student.year}</td></tr>
            <tr><th>Address</th><td>\${student.address}</td></tr>
            <tr><th>Skills</th><td>\${skillsDisplay}</td></tr>
          </table>
        \`;
      })
      .catch((err) => {
        document.getElementById("studentDetails").innerHTML = "<p>Error loading student details.</p>";
      });
  </script>
</body>
</html>`
          },
          {
            name: "public/style.css",
            lang: "css",
            icon: "css",
            content: `body {
  font-family: Arial, sans-serif;
  background: #f2f2f2;
  margin: 0;
  padding: 30px;
}

.container {
  width: 650px;
  max-width: 90%;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px #aaa;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
}

h2 {
  text-align: center;
}

label {
  display: block;
  margin-top: 12px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  border-radius: 5px;
}

.radio {
  margin-top: 8px;
}

.radio input {
  width: auto;
  margin-right: 5px;
}

.skills label {
  font-weight: normal;
  display: inline-block;
  margin-right: 15px;
}

.skills input {
  width: auto;
}

button,
.button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

button:hover,
.button:hover {
  background: #555;
}

.logout {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: red;
  text-decoration: none;
}

.logout:hover {
  text-decoration: underline;
}

.info {
  text-align: center;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #aaa;
  padding: 12px;
  text-align: left;
}

th {
  width: 35%;
  background-color: #f7f7f7;
}`
          }
        ]
      },
      {
        id: "osc-7",
        num: 7,
        title: "Employee Information Portal",
        category: "MERN Stack (Express, MongoDB, EJS)",
        description: "Full CRUD employee management portal featuring Admin bcrypt authentication, Mongoose data schemas, department filtering, search, add, edit, and delete operations.",
        runCommand: "npm install express mongoose express-session bcryptjs dotenv ejs && node server.js",
        expectedOutput: `Connected to MongoDB
Default admin created (Username: admin, Password: password123)
Server running on http://localhost:3000`,
        files: [
          {
            name: "models/Employee.js",
            lang: "javascript",
            icon: "js",
            content: `const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId:       { type: String, required: true, unique: true },
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  department:  { type: String, required: true },
  designation: { type: String, required: true },
  salary:      { type: Number, required: true },
  joiningDate: { type: Date, required: true },
  address:     { type: String },
  skills:      { type: [String] }, // Array of skill tags
});

module.exports = mongoose.model("Employee", employeeSchema);`
          },
          {
            name: "models/Admin.js",
            lang: "javascript",
            icon: "js",
            content: `const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);`
          },
          {
            name: "server.js",
            lang: "javascript",
            icon: "js",
            content: `require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");
const Employee = require("./models/Employee");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my-super-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/employee_portal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await Admin.create({ username: "admin", password: hashedPassword });
      console.log("Default admin created (Username: admin, Password: password123)");
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Authentication Middleware
const requireAuth = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    res.redirect("/login");
  }
};

// --- ROUTES ---
app.get("/login", (req, res) => res.render("login", { error: null }));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    req.session.adminId = admin._id;
    res.redirect("/");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Dashboard with Search & Filter
app.get("/", requireAuth, async (req, res) => {
  const { search, department } = req.query;
  let query = {};
  if (search) query.name = new RegExp(search, "i");
  if (department) query.department = department;

  const employees = await Employee.find(query).sort({ joiningDate: -1 });
  const departments = await Employee.distinct("department");
  res.render("dashboard", {
    employees,
    departments,
    searchQuery: search,
    deptQuery: department,
  });
});

// Add Employee
app.get("/add", requireAuth, (req, res) => res.render("add"));

app.post("/add", requireAuth, async (req, res) => {
  try {
    const newEmployee = new Employee({
      ...req.body,
      skills: req.body.skills ? req.body.skills.split(",").map((s) => s.trim()) : [],
    });
    await newEmployee.save();
    res.redirect("/");
  } catch (err) {
    res.send("Error saving employee. Ensure Emp ID is unique.");
  }
});

// View Single Employee
app.get("/view/:id", requireAuth, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send("Employee not found");
  res.render("view", { employee });
});

// Edit Employee
app.get("/edit/:id", requireAuth, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("edit", { employee });
});

app.post("/edit/:id", requireAuth, async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, {
    ...req.body,
    skills: req.body.skills ? req.body.skills.split(",").map((s) => s.trim()) : [],
  });
  res.redirect("/");
});

// Delete Employee
app.post("/delete/:id", requireAuth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`));`
          }
        ]
      }
    ]
  }
};
