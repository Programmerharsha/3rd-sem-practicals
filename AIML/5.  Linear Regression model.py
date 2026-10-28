Aim: 
To develop a Linear Regression model using Python to predict house prices based on 
house size and visualize the results using Matplotlib. 
Algorithm: 
Step 1: Start the program. 
Step 2: Import the required libraries (NumPy, Matplotlib, and LinearRegression). 
Step 3: Create the input dataset (House Size) and output dataset (House Price). 
Step 4: Reshape the input data into a two-dimensional array. 
Step 5: Create a Linear Regression model. 
Step 6: Train the model using the fit() method. 
Step 7: Predict the output values using the trained model. 
Step 8: Predict the price for a new house size. 
Step 9: Display the slope, intercept, and predicted price. 
Step 10: Plot the actual data using a scatter plot. 
Step 11: Plot the regression line using the predicted values. 
Step 12: Plot the new house prediction on the graph. 
Step 13: Display the graph with appropriate title, labels, and legend. 
Step 14: Stop.


import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

X = np.array([1,2,3,4,5]).reshape(-1, 1)

Y = np.array([2,4,5,4,5])

model = LinearRegression()

model.fit(X, Y)

predicted = model.predict(X)

print("Slope (m):", model.coef_[0])
print("Intercept (c):", model.intercept_)

new_house = np.array([[1525]])
predicted_price = model.predict(new_house)

print("Predicted Price for 1525 sq.ft house:", predicted_price[0])

plt.scatter(X, Y, color="blue", label="Actual Data")

plt.plot(X, predicted, color="red", linewidth=2, label="Regression Line")

plt.title("House Size vs House Price")
plt.xlabel("House Size (sq.ft)")
plt.ylabel("House Price (Lakhs)")
plt.legend()

plt.show()


