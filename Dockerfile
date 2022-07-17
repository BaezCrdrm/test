FROM maven:3.8-openjdk-17
ARG JAR_FILE=familytree-0.0.1-SNAPSHOT.jar
COPY target/${JAR_FILE} nbd.jar
ENTRYPOINT ["java","-jar","nbd.jar"]