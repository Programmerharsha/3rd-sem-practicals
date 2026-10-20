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


