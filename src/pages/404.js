import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const NotFoundPage = () => (
  <div style={{
    padding: rhythm(1)
  }}>
    <h1>NOT FOUND</h1>
    <p>Oops, you just hit a route that doesn&#39;t exist...</p>
    <Link to="/">Try visiting the main page instead</Link>. Maybe you'll find what you were looking for.
  </div>
)

export default NotFoundPage
