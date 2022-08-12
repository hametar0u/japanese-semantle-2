web: export PYSPARK_SUBMIT_ARGS="--master local[2] pyspark-shell" && export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
web: gunicorn japanese_semantle.wsgi --log-file=-