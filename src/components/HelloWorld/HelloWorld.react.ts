import React from "react";
import { createComponent } from '@lit/react';
import { HelloWorld } from './HelloWorld';

export const AuroHelloWorld = createComponent({
  tagName: 'auro-hello-world',
  elementClass: HelloWorld,
  react: React
})