docker run -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.3
  meilisearch --master-key="3dTSUtI6cWDITErmvij524rMkkjRnS1PGmpuqQYVx1c"
