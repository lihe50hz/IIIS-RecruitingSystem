FROM openjdk:11

ARG EXPOSE_PORT
ARG CI_COMMIT_BRANCH
WORKDIR /home

COPY ./target/scala-2.12/assembly_main.jar /home
EXPOSE ${EXPOSE_PORT}

ENV TZ=Asia/Shanghai
ENV CI_COMMIT_BRANCH=${CI_COMMIT_BRANCH}
ENV JVM_OPTS="-server -XX:+UseContainerSupport -XX:InitialRAMPercentage=75 -XX:MaxRAMPercentage=75 -XX:ParallelGCThreads=8 -XX:+PrintFlagsFinal -XX:MetaspaceSize=16380m -XX:MaxMetaspaceSize=16380m -XX:ActiveProcessorCount=256"

# 安装 filebeat
#RUN curl -L -O http://10.1.18.29:32000/shared/filebeat-8.5.3-amd64.deb \
#    && dpkg -i filebeat-8.5.3-amd64.deb

# 编辑配置文件: 根据 CI_COMMIT_BRANCH 的值选择要复制的文件
#COPY ./filebeat.yml /etc/filebeat/filebeat.yml
#RUN sed -i "s/name: \([a-zA-Z0-9]*\)Filebeat/name: \1-${CI_COMMIT_BRANCH}-Filebeat/g" /etc/filebeat/filebeat.yml

# 启动 filebeat 的 elasticsearch 模块及更新相关配置
#RUN filebeat modules enable elasticsearch
#RUN sed -i 's/enabled: false/enabled: true/g' /etc/filebeat/modules.d/elasticsearch.yml
#RUN filebeat modules list | head -10

# 启动 filebeat 上传功能, 运行 jar 包
ENTRYPOINT ["sh", "-c", "java ${JVM_OPTS} -jar assembly_main.jar"]
