import * as React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
`;

export default ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>Shane's Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    </div>
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
            <p>{node.excerpt}</p>
          </BlogLink>
        </div>
      ))}
    </div>
  </Layout>
);

export const Head = () => <Seo title="Home" />;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
