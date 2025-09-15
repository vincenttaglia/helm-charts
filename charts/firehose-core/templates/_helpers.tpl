{{/*
Expand the name of the chart.
*/}}
{{- define "firehose-ethereum.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "firehose-ethereum.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "firehose-ethereum.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "firehose-ethereum.labels" -}}
helm.sh/chart: {{ include "firehose-ethereum.chart" . }}
{{ include "firehose-ethereum.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "firehose-ethereum.selectorLabels" -}}
app.kubernetes.io/name: {{ include "firehose-ethereum.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "firehose-ethereum.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "firehose-ethereum.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "firehose.segmentSize" -}}
{{- $total := sub .Values.firehose.stopBlock .Values.firehose.startBlock | add1 -}}
{{- $raw := div $total .Values.firehose.workers -}}
{{- $rounded := mul (div (add $raw 50) 100) 100 -}}
{{- $rounded -}}
{{- end -}}

{{- define "firehose-ethereum.componentLabelFor" -}}
app.kubernetes.io/component: {{ . }}
{{- end }}