Aim:  
To apply the Support Vector Machine (SVM) algorithm on the Iris dataset and evaluate 
its classification performance using accuracy and other performance metrics. 
Algorithm: 
Step 1: Start the program. 
Step 2: Import the required libraries (load_iris, train_test_split, SVC, and evaluation metrics). 
Step 3: Load the Iris dataset. 
Step 4: Separate the dataset into input features (X) and target labels (y). 
Step 5: Split the dataset into training and testing sets using train_test_split(). 
Step 6: Create an SVM classifier using the SVC class. 
Step 7: Train the SVM model using the training data with the fit() method. 
Step 8: Use the trained model to predict the class labels for the testing data. 
Step 9: Compare the predicted labels with the actual labels. 
Step 10: Calculate the classification accuracy. 
Step 11: Generate the confusion matrix. 
Step 12: Calculate precision, recall, and F1-score for performance evaluation. 
Step 13: Display the predicted values and evaluation metrics. 
Step 14: Interpret the classification performance of the SVM model. 
Step 15: Stop the program.


from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score
)

iris = load_iris()

X = iris.data
y = iris.target

print("===== IRIS DATASET =====")
print("Classes:", iris.target_names)
print("Total Samples:", len(X))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2
)

print("\n===== TRAINING AND TESTING =====")
print("Training Samples:", len(X_train))
print("Testing Samples :", len(X_test))

model = SVC(kernel='linear')

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("\n===== PREDICTION =====")
print("Actual Classes   :", y_test)
print("Predicted Classes:", y_pred)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')
cm = confusion_matrix(y_test, y_pred)

print("\n===== PERFORMANCE =====")
print("Accuracy  :", round(accuracy * 100, 2), "%")
print("Precision :", round(precision, 4))
print("Recall    :", round(recall, 4))
print("F1-Score  :", round(f1, 4))

print("\n===== CONFUSION MATRIX =====")
print(cm)
