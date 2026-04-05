FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the app
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar file
CMD java -jar target/*.jar


