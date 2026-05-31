import { useState, useEffect } from 'react'
import yaml from 'js-yaml'
import './App.css'

const GITHUB_USER = 'vincenttaglia'
const REPO_URL = `https://github.com/${GITHUB_USER}/helm-charts`
const PAGES_URL = `https://${GITHUB_USER}.github.io/helm-charts`
const SITE_URL = 'https://vincenttaglia.eth.limo'
const LOGO_URL = 'https://avatars.githubusercontent.com/u/15239196?v=4'
const HELM_REPO_ALIAS = 'vincenttaglia'
const INDEX_URL = `${PAGES_URL}/index.yaml`

function useCharts() {
  const [charts, setCharts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(INDEX_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch index.yaml (${res.status})`)
        return res.text()
      })
      .then((text) => {
        const index = yaml.load(text)
        const parsed = []
        if (index?.entries) {
          for (const [name, versions] of Object.entries(index.entries)) {
            if (!versions?.length) continue
            const latest = versions[0]
            parsed.push({
              name,
              version: latest.version,
              appVersion: latest.appVersion || '',
              description: latest.description || '',
              keywords: latest.keywords || [],
              home: latest.home || '',
              sources: latest.sources || [],
              created: latest.created || '',
            })
          }
        }
        parsed.sort((a, b) => a.name.localeCompare(b.name))
        setCharts(parsed)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { charts, loading, error }
}

function CubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

function Navbar() {
  return (
    <nav className="navbar">
      <a href={SITE_URL}>
        <img src={LOGO_URL} alt="VincentTaglia.eth" className="navbar-logo" />
      </a>
      <ul className="navbar-links">
        <li><a href={SITE_URL}>Home</a></li>
        <li><a href={`${SITE_URL}/#about`}>About</a></li>
        <li><a href={REPO_URL}><GithubIcon /></a></li>
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-pretitle">Open Source</span>
        <h1>Helm Charts for Blockchain Infrastructure</h1>
        <p>
          Production-ready Kubernetes charts for running blockchain nodes and
          related infrastructure, built and maintained by VincentTaglia.eth.
        </p>
        <div className="hero-actions">
          <a href="#install" className="btn btn-primary">Get Started</a>
          <a href={REPO_URL} className="btn btn-secondary">
            <GithubIcon /> View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function InstallSection() {
  const [copied, setCopied] = useState(false)

  const snippet = `helm repo add ${HELM_REPO_ALIAS} ${PAGES_URL}\nhelm repo update\nhelm search repo ${HELM_REPO_ALIAS}`

  function handleCopy() {
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="install" className="section section-alt">
      <div className="section-inner">
        <div className="section-header">
          <h2>Quick Start</h2>
          <p>Add the chart repository to Helm and start deploying.</p>
        </div>
        <div className="install-block">
          <div className="code-block">
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <code>
              <span className="comment"># Add the Helm repository</span>{'\n'}
              <span className="command">helm repo add</span> {HELM_REPO_ALIAS} {PAGES_URL}{'\n'}
              {'\n'}
              <span className="comment"># Update your local cache</span>{'\n'}
              <span className="command">helm repo update</span>{'\n'}
              {'\n'}
              <span className="comment"># Browse available charts</span>{'\n'}
              <span className="command">helm search repo</span> {HELM_REPO_ALIAS}
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChartsSection({ charts, loading, error }) {
  return (
    <section id="charts" className="section">
      <div className="section-inner">
        <div className="section-header">
          <h2>Available Charts</h2>
          <p>Helm charts for blockchain node infrastructure.</p>
        </div>
        {loading && <p className="charts-status">Loading charts...</p>}
        {error && <p className="charts-status">Could not load charts: {error}</p>}
        {!loading && !error && charts.length === 0 && (
          <p className="charts-status">No charts published yet. Check back soon.</p>
        )}
        <div className="charts-grid">
          {charts.map((chart) => (
            <div key={chart.name} className="chart-card">
              <div className="chart-card-header">
                <div className="chart-icon">
                  <CubeIcon />
                </div>
                <div>
                  <h3>{chart.name} <span className="chart-version">v{chart.version}</span></h3>
                </div>
              </div>
              <p>{chart.description}</p>
              <div className="chart-meta">
                {chart.keywords.map((kw) => (
                  <span key={kw} className="chart-tag">{kw}</span>
                ))}
                {chart.appVersion && (
                  <span className="chart-tag">appVersion: {chart.appVersion}</span>
                )}
              </div>
              <div className="chart-links">
                <a href={`${REPO_URL}/tree/main/charts/${chart.name}`}>Source</a>
                <a href={`${REPO_URL}/releases/tag/${chart.name}-${chart.version}`}>Release</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div className="section-header">
          <h2>Why these charts?</h2>
          <p>Built by an operator who runs blockchain infrastructure in production.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircleIcon />
            </div>
            <h3>CI-Tested</h3>
            <p>Every chart is linted and install-tested on a Kind cluster before release.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <ShieldIcon />
            </div>
            <h3>Production-Ready</h3>
            <p>RBAC, persistent storage, health probes, and monitoring out of the box.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <RocketIcon />
            </div>
            <h3>Automated Releases</h3>
            <p>Charts are packaged and published automatically on every merge to main.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={LOGO_URL} alt="VincentTaglia.eth" className="footer-logo" />
          <p>Ethereum validator &amp; indexer for The Graph Protocol.</p>
        </div>
        <div>
          <h4>Links</h4>
          <ul className="footer-links">
            <li><a href={SITE_URL}>Home</a></li>
            <li><a href={`${SITE_URL}/#about`}>About</a></li>
            <li><a href={REPO_URL}>GitHub</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul className="footer-links">
            <li><a href="https://twitter.com/vincenttaglia">Twitter</a></li>
            <li><a href="https://t.me/vincenttaglia">Telegram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {year} VincentTaglia.eth. All rights reserved.</span>
        <a href={REPO_URL}><GithubIcon /></a>
      </div>
    </footer>
  )
}

function App() {
  const { charts, loading, error } = useCharts()

  return (
    <>
      <Navbar />
      <Hero />
      <InstallSection />
      <ChartsSection charts={charts} loading={loading} error={error} />
      <FeaturesSection />
      <Footer />
    </>
  )
}

export default App
