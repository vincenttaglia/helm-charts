# Substreams Sink Noop Helm Chart

This Helm chart deploys substreams-sink-noop, a tool for processing Substreams data.

## Quick Start

### Public .spkg packages

```yaml
substreams_sink_noop:
  config:
    endpoint: "mainnet.eth.streamingfast.io:443"
    manifest: "https://github.com/streamingfast/substreams-eth-block-meta/releases/download/v0.4.1/substreams-eth-block-meta-v0.4.1.spkg"
    module: "graph_out"
```

### Private .spkg packages (via Kubernetes secrets)

1. Create a secret with your .spkg file:
```bash
kubectl create secret generic my-private-spkg \
  --from-file=package.spkg=./your-package.spkg
```

2. Configure the chart:
```yaml
substreams_sink_noop:
  config:
    endpoint: "mainnet.eth.streamingfast.io:443"
    manifest: "/mnt/spkg/package.spkg"
    module: "graph_out"
  
  volumes:
    - name: private-spkg
      secret:
        secretName: my-private-spkg
  
  volumeMounts:
    - name: private-spkg
      mountPath: /mnt/spkg
      readOnly: true
```

3. Deploy:
```bash
helm install my-sink ./substreams-sink-noop -f values.yaml
```

## Environment Variables

You can set environment variables for the container:

```yaml
substreams_sink_noop:
  env:
    - name: LOG_LEVEL
      value: "debug"
    - name: TIMEOUT
      value: "30s"
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: my-secret
          key: api-key
```

## Configuration

See `values.yaml` for all available configuration options.

