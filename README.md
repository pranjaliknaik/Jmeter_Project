# JMeter Project 🚀

Welcome to the JMeter Project repository! This repository contains performance testing scripts and resources created using Apache JMeter for evaluating the performance of web applications.

## 📁 Repository Structure

- **/scripts**: This directory contains Apache JMeter test scripts used for performance testing different aspects of the web application.
- **/reports**: The directory where performance test reports are stored. You'll find generated reports and logs here.
- **/reports**: The directory where performance test csv results are stored. You'll find generated csv file here.
- **/config**: Configuration files used in the performance testing process are stored in this directory.

## 🚀 Getting Started

To get started with using the performance testing scripts in this repository, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/pranjaliknaik/Jmeter_Project.git
```

2. **Install Apache JMeter** if you haven't already. You can download it from the [official Apache JMeter website](https://jmeter.apache.org/).

3. **Open Apache JMeter** and import the desired test script from the `/scripts` directory.

4. **Configure** the test script as needed for your specific application and test environment.

5. **Execute** the performance tests using Apache JMeter.

## 🎯 Test Scenarios

The performance testing scripts in this repository cover various scenarios including:

- **Login Performance Test**: Simulates multiple users logging into the web application simultaneously.
- **Search Performance Test**: Measures the response time of search operations under different load conditions.
- **Checkout Performance Test**: Evaluates the performance of the checkout process during peak usage periods.

## 📊 Reporting

Once you have executed the performance tests, you can find the test reports in the `/results` directory. These reports provide insights into the performance characteristics of the web application under test.

## 📚 Learnings

During this project, I gained valuable experience and knowledge in the following areas:

1. **Recording with Think Time Template:** I learned how to effectively record user interactions with the application and incorporate think time between requests to simulate real-world user behaviour.

2. **Different Thread Groups:** I explored various thread group options in JMeter, including the Ultimate Thread Group, Arrivals Thread Group, and Open Model Thread Group, and learned how to choose the most suitable one for different testing scenarios.

3. **CSV Data Set Config for Parameterization:** I discovered the importance of parameterization in performance testing. I learned how to use the CSV Data Set Config element to dynamically feed data into my test scripts.

4. **Correlation:** I mastered the technique of correlation to handle dynamic values and maintain session consistency during performance testing, ensuring accurate test results.

5. **Script Validation:** I learned how to validate JMeter scripts to ensure they accurately simulate user behaviour and produce reliable performance test results.

6. **GUI Mode Smoke Testing:** I practised conducting smoke tests in GUI mode to quickly validate basic functionality and identify any immediate issues before proceeding with comprehensive load testing.

7. **Non-GUI Mode Load Testing:** I gained proficiency in running load tests in cmd mode to conserve system resources and execute tests more efficiently, especially for larger-scale performance testing scenarios.


## 👩‍💻 Contributors

- Pranjali Naik

## 📝 Feedback and Contributions

If you have any feedback, or suggestions, or would like to contribute to this project by adding new test scenarios or improving existing ones, please feel free to open an issue or submit a pull request. Contributions are always welcome!
