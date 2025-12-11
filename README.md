# Practical work of spring boot, keyclock, react js

## Objectives 

- in this practical work we will explore how keyclock works, with spring boot as a resource server and react js as a client.

## Practical work

### Keyclock configuration

- first we will open keyclock with the docker and do the following steps:
  - create a new realm
  - create a role in the realm
  - create a user and assign the role to it
  - create a new client which is the react client

- Next step is to create a spring boot project with the following dependencies
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security-oauth2-resource-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-jose</artifactId>
</dependency>
```
- Next we add the property of the resource server
```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/enset-realm
```



















