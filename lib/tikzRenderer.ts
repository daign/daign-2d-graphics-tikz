import { PresentationNode, View } from '@daign/2d-pipeline';
import { StyleSelectorChain, StyleSheet, StyleProcessor } from '@daign/style-sheets';
import { GraphicStyle } from '@daign/2d-graphics';

import { TikzRenderModule } from './tikzRenderModule';

/**
 * Class for the TikzRenderer.
 * Outputs TikZ code.
 */
export class TikzRenderer {
  private styleSheet: StyleSheet<GraphicStyle>;

  private renderModules: TikzRenderModule[] = [];

  // Number of decimal places to round values to.
  public precision: number = 6;

  /**
   * Constructor.
   * @param styleSheet - The style sheet to use.
   */
  public constructor( styleSheet: StyleSheet<GraphicStyle> ) {
    this.styleSheet = styleSheet;
  }

  /**
   * Add a render module to the renderer.
   * @param renderModule - The renderModule to add.
   */
  public addRenderModule( renderModule: TikzRenderModule ): void {
    this.renderModules.push( renderModule );
  }

  /**
   * Add styling commands to a TikZ shape.
   * @param tikzShape - The TikZ shape to style.
   * @param selectorChain - The style selector chain object.
   * @returns The styled TikZ commands.
   */
  public applyStyle( tikzShape: string, selectorChain: StyleSelectorChain ): string {
    const styleProcessor = new StyleProcessor<GraphicStyle>();
    const style = styleProcessor.calculateStyle( this.styleSheet, selectorChain, GraphicStyle );

    let tikzCommands = '';

    if ( style.fontSize ) {
      tikzCommands += `\\${style.fontSize}\n`;
    }

    if ( style.fill && style.fill !== 'none' ) {
      tikzCommands += `\\definecolor{temp}{HTML}{${style.fill.substring( 1 )}}\n`;
      tikzCommands += `\\fill[temp] ${tikzShape};\n`;
    }

    if ( style.stroke && style.stroke !== 'none' ) {
      tikzCommands += `\\definecolor{temp}{HTML}{${style.stroke.substring( 1 )}}\n`;
      if ( style.strokeWidth ) {
        tikzCommands += `\\draw[temp, line width=${style.strokeWidth}] ${tikzShape};\n`;
      } else {
        tikzCommands += `\\draw[temp] ${tikzShape};\n`;
      }
    }

    // Style.opacity is ignored.

    return tikzCommands;
  }

  /**
   * Recursive render function to create the TikZ code.
   * @param currentNode - The presentation node to render.
   * @param selectorChain - The style selector chain object.
   * @returns The TikZ code.
   */
  public renderRecursive(
    currentNode: PresentationNode, selectorChain: StyleSelectorChain
  ): string {
    let tikzSequence: string = '';

    // All render modules added to the TikzRenderer are checked and executed if the type matches.
    this.renderModules.forEach( ( module: TikzRenderModule ): void => {
      if ( currentNode.sourceNode instanceof module.type ) {
        tikzSequence += module.callback( currentNode, selectorChain, this );
      }
    } );

    return tikzSequence;
  }

  /**
   * Render the view and return as TikZ code.
   * @param view - The view to render.
   * @returns The TikZ document.
   */
  public render( view: View ): string {
    const presentationNode = view.viewPresentationNode;
    const selectorChain = new StyleSelectorChain();

    let tikzDocument = '\\begin{tikzpicture}\n';

    if ( presentationNode !== null ) {
      tikzDocument += this.renderRecursive( presentationNode, selectorChain );
    }

    tikzDocument += '\\end{tikzpicture}';
    return tikzDocument;
  }
}
