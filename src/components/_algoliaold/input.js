/* eslint-disable no-unused-vars */
import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
// import { Search } from "styled-icons/fa-solid/Search";
import { shadowAround } from '../../styles';
import { useTheme } from 'emotion-theming';
import { Search } from 'react-feather';

const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
  margin: 0 10px;
`;
const focus = (props) => css`
  color: ${(props) => props.theme.colors.primary};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${(props) => props.theme.colors.primary};
    margin: 0.3em;
  }
`;
const collapse = (props) => css`
  width: 0;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  + ${SearchIcon} {
    color: white;
  }
  ${(props) => props.focus && focus()}
  margin-left: ${(props) => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${(props) => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;
const expand = (props) => css`
  background: ${(props) => props.theme.colors.grayLight};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`;

const collapseExpand = (props) => css`
  ${(props) => (props.collapse ? collapse() : expand())}
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  transition: ${(props) => props.theme.transitions.hover};
  border-radius: 1px;
  padding-left: 10px;
  background-color: transparent;
  width: calc(100% - 26px);
  border-width: 0 !important;
  &,
  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
  ${collapseExpand}
`;

const Form = styled.form`
  display: flex;
  z-index: 5;
  flex-direction: row-reverse;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-left: 15px;
  }
  padding: 8px 4px;
  border-radius: 4px;
  background-color: #f7f7f7;
  &,
  *,
  input::placeholder {
    transition: ${(props) => props.theme.transitions.hover};
  }
  &:focus,
  &:visited,
  &:hover,
  &:focus-within {
    outline: none;
    background-color: transparent;
    input,
    input::placeholder {
      &,
      ::placeholder {
        color: ${(props) => props.theme.colors.gray};
      }
    }
    svg path {
      fill: ${(props) => props.theme.colors.gray};
    }
  }

  svg path {
    fill: ${(props) => props.theme.colors.grayLight};
  }
`;

export default connectSearchBox(({ refine, ...rest }) => {
  const theme = useTheme();
  const preventSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Form css={shadowAround(theme)} onSubmit={preventSubmit}>
      <SearchIcon />
      <Input
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        {...rest}
      />
    </Form>
  );
});
