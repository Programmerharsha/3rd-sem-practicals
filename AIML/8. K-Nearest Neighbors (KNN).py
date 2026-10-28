Aim:  
To implement the K-Nearest Neighbors (KNN) classification algorithm using a loan 
dataset to predict whether a loan application will be approved or not approved. 
 
Algorithm:  
Step 1: Import the required libraries such as Pandas, LabelEncoder, StandardScaler, 
KNeighborsClassifier, train_test_split, accuracy_score, and confusion_matrix. 
Step 2: Load the loan dataset from the CSV file using pd.read_csv(). 
Step 3: Display the first few records and total number of records in the dataset. 
Step 4: Select the required columns: ApplicantIncome, LoanAmount, Credit_History, and 
Loan_Status. 
Step 5: Remove rows containing missing values using dropna(). 
Step 6: Convert the target variable Loan_Status into numerical values using LabelEncoder. 
Step 7: Separate the feature variables (X) and target variable (y). 
Step 8: Split the dataset into training data (80%) and testing data (20%). 
Step 9: Apply feature scaling using StandardScaler to normalize the feature values. 
Step 10: Create a K-Nearest Neighbors (KNN) classifier with n_neighbors = 5. 
Step 11: Train the KNN model using the scaled training data. 
Step 12: Predict the loan status for the testing data. 
Step 13: Compare the actual and predicted values. 
Step 14: Evaluate the model using Accuracy Score and Confusion Matrix. 
Step 15: Enter details of a new applicant and scale the input data. 
Step 16: Predict the loan status for the new applicant using the trained KNN model. 
Step 17: Display the final result as Approved or Not Approved.


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

data = pd.read_csv("Student_043_Loan_Data.csv")
print("===== LOAN DATASET =====")
print(data.head())
print("\nTotal Records:", len(data))

data = data[
    ["ApplicantIncome", "LoanAmount",
     "Credit_History", "Loan_Status"]
]

data = data.dropna()
print("\nRecords after removing missing values:", len(data))

encoder = LabelEncoder()
data["Loan_Status"] = encoder.fit_transform(
    data["Loan_Status"]
)


X = data[
    ["ApplicantIncome", "LoanAmount", "Credit_History"]
]

y = data["Loan_Status"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Samples:", len(X_train))
print("Testing Samples :", len(X_test))

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


knn = KNeighborsClassifier(n_neighbors=5)

knn.fit(X_train_scaled, y_train)

y_pred = knn.predict(X_test_scaled)
print("\n===== ACTUAL VS PREDICTED =====")
result_table = pd.DataFrame({
    "Actual": y_test.values,
    "Predicted": y_pred
})

print(result_table)

accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print("\n===== MODEL PERFORMANCE =====")
print("KNN Accuracy:", round(accuracy * 100, 2), "%")
print("\nConfusion Matrix:")
print(cm)

new_data = pd.DataFrame(
    [[5000, 150, 1]],
    columns=[
        "ApplicantIncome",
        "LoanAmount",
        "Credit_History"
    ]
)

print("\n===== NEW APPLICANT =====")
print(new_data)

new_data_scaled = scaler.transform(new_data)

prediction = knn.predict(new_data_scaled)

loan_status = encoder.inverse_transform(prediction)

if loan_status[0] == "Y":
    print("\nLoan Status: Approved")
else:
    print("\nLoan Status: Not Approved")
