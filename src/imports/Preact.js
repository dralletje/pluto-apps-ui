// @ts-nocheck
// import { render, Component, h, cloneElement, createContext, hydrate } from "preact"
// import { useEffect, useLayoutEffect, useState, useRef, useMemo, useContext } from "preact/hooks"

// import htm from "htm"

// const html = htm.bind(h)

// export { html, render, Component, useEffect, useLayoutEffect, useState, useRef, useMemo, createContext, useContext, h, cloneElement, hydrate }

import htm from "htm";
import React from "react";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
  Component,
} from "react";

export {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
  Component,
};

export default React;
export * from "react";

export const hydrate = null;

export const h = React.createElement;

export const html = htm.bind(React.createElement);
