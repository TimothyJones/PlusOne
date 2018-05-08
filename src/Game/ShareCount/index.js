// @flow

import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
  FacebookShareCount,
  RedditShareCount
} from 'react-share';

import './sharecount.css';

type Props = { url: string };

export default class ScoreBoard extends React.Component<Props> {
  render() {
    return (
      <div>
        <p className="shareHeader">Share:</p>
        <FacebookShareButton url={this.props.url}>
          <span className="shareButton">
            <FacebookIcon size={44} round={true} />
            <FacebookShareCount url={this.props.url}>
              {(shareCount: string) =>
                shareCount != '0' ? (
                  <p className="shareCount">{shareCount}</p>
                ) : (
                  <p />
                )
              }
            </FacebookShareCount>
          </span>
        </FacebookShareButton>
        <TwitterShareButton url={this.props.url}>
          <span className="shareButton">
            <TwitterIcon size={44} round={true} />
          </span>
        </TwitterShareButton>
        <RedditShareButton url={this.props.url}>
          <span className="shareButton">
            <RedditIcon size={44} round={true} />
            <RedditShareCount url={this.props.url}>
              {(shareCount: string) =>
                shareCount != '0' ? (
                  <p className="shareCount">{shareCount}</p>
                ) : (
                  <p />
                )
              }
            </RedditShareCount>
          </span>
        </RedditShareButton>
        <span className="shareButton">
          <EmailShareButton url={this.props.url}>
            <span className="shareButton">
              <EmailIcon size={44} round={true} />
            </span>
          </EmailShareButton>
        </span>
      </div>
    );
  }
}
