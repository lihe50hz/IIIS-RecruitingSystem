FROM openjdk:11

ARG EXPOSE_PORT
ARG CI_COMMIT_BRANCH
WORKDIR /home

COPY ./target/scala-2.12/assembly_main.jar /home
EXPOSE ${EXPOSE_PORT}

ENV TZ=Asia/Shanghai
ENV CI_COMMIT_BRANCH=${CI_COMMIT_BRANCH}
ENV JVM_OPTS="-server -XX:+UseContainerSupport -XX:InitialRAMPercentage=75 -XX:MaxRAMPercentage=75 -XX:ParallelGCThreads=8 -XX:+PrintFlagsFinal -XX:MetaspaceSize=16380m -XX:MaxMetaspaceSize=16380m -XX:ActiveProcessorCount=256"


# 启动 filebeat 上传功能, 运行 jar 包
ENTRYPOINT ["sh", "-c", "java ${JVM_OPTS} -jar assembly_main.jar"]
