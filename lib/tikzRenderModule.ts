import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';

import { TikzRenderer } from './tikzRenderer';

/**
 * Class for the render modules.
 * Every time the renderer encounters an object of the specified type it will invoke the callback
 * function.
 */
export class TikzRenderModule {
  // The type of object for which the module applies.
  public type: any;

  // The callback function with the code that specifies how the object is rendered.
  public callback: (
    // The PresentationNode of the object to render.
    currentNode: PresentationNode,
    // The style selector chain object.
    selectorChain: StyleSelectorChain,
    // The reference to the TikzRenderer object which is running.
    renderer: TikzRenderer
  ) => string;

  /**
   * Constructor.
   * @param type - The type of object for which the module applies.
   * @param callback - The callback function that specifies how the object is rendered.
   */
  public constructor (
    type: any,
    callback: (
        currentNode: PresentationNode,
        selectorChain: StyleSelectorChain,
        renderer: TikzRenderer
      ) => string
  ) {
    this.type = type;
    this.callback = callback;
  }
}
