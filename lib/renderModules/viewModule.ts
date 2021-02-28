import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const viewModule = new TikzRenderModule(
  View,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    let tikzSequence = '';

    currentNode.children.forEach( ( child: PresentationNode ): void => {
      const selectorChainCopy = selectorChain.clone();
      tikzSequence += renderer.renderRecursive( child, selectorChainCopy );
    } );
    return tikzSequence;
  }
);
