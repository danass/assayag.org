<<<<<<< HEAD
# Use an official Node.js runtime as the base image
FROM node:14

# Create a new user with non-root privileges
RUN useradd -ms /bin/bash appuser

# Set working directory
WORKDIR /home/appuser/app
RUN mkdir -p .meteor/local && chown -R appuser:appuser .meteor/local
USER appuser

# Copy application files to the working directory
COPY . .

# Install global npm packages
RUN curl https://install.meteor.com/ | sh

# Ensure meteor command is available in PATH
ENV PATH="/home/appuser/.meteor:${PATH}"
USER root

# Install app dependencies
RUN meteor npm install --save @babel/runtime react react-dom react-router-dom @mui/base @mui/material humanize-duration html2canvas @mui/icons-material @mui/x-date-pickers @emotion/styled @emotion/react date-fns twitter-api-v2 emailjs-mime-parser xml-js imapflow  nodemailer 


# Add MongoDB tools
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    dpkg -i mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    rm mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    apt-get clean

# Apply correct rights to appuser
RUN chown -R appuser:appuser .

# Exposing non sudo-user
USER appuser
# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["meteor", "run"]

# Command to restore MongoDB dump
=======
# Use an official Node.js runtime as the base image
FROM node:14

# Create a new user with non-root privileges
RUN useradd -ms /bin/bash appuser

# Set working directory
WORKDIR /home/appuser/app
RUN mkdir -p .meteor/local && chown -R appuser:appuser .meteor/local
USER appuser

# Copy application files to the working directory
COPY . .

# Install global npm packages
RUN curl https://install.meteor.com/ | sh

# Ensure meteor command is available in PATH
ENV PATH="/home/appuser/.meteor:${PATH}"
USER root

# Install app dependencies
RUN meteor npm install --save @babel/runtime react react-dom react-router-dom @mui/base @mui/material humanize-duration html2canvas @mui/icons-material @mui/x-date-pickers @emotion/styled @emotion/react date-fns twitter-api-v2 emailjs-mime-parser xml-js imapflow  nodemailer  @babel/runtime


# Add MongoDB tools
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    dpkg -i mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    rm mongodb-database-tools-ubuntu2004-x86_64-100.3.1.deb && \
    apt-get clean

# Apply correct rights to appuser
RUN chown -R appuser:appuser .

# Exposing non sudo-user
USER appuser
# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["meteor", "run"]

# Command to restore MongoDB dump
>>>>>>> 719db0dcb7bc6a294db2a84ed60f3ce1f554ecb9
#RUN mongorestore --host 127.0.0.1 --port 3001 --nsInclude=meteor.* /home/appuser/app/dump