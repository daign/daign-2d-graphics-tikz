import { PresentationNode } from '@daign/2d-pipeline';
import { StyleSelectorChain } from '@daign/style-sheets';
import { Group } from '@daign/2d-graphics';

import { TikzRenderer } from '../tikzRenderer';
import { TikzRenderModule } from '../tikzRenderModule';

export const groupModule = new TikzRenderModule(
  Group,
  (
    currentNode: PresentationNode,
    selectorChain: StyleSelectorChain,
    renderer: TikzRenderer
  ): string => {
    const group = currentNode.sourceNode as Group;
    selectorChain.addSelector( group.styleSelector );

    let tikzSequence = '';

    currentNode.children.forEach( ( child: PresentationNode ): void => {
      const selectorChainCopy = selectorChain.clone();
      tikzSequence += renderer.renderRecursive( child, selectorChainCopy );
    } );
    return tikzSequence;
  }
);
