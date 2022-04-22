import { StyleSheet } from '@daign/style-sheets';
import { GraphicStyle } from '@daign/2d-graphics';

import { TikzRenderer } from './tikzRenderer';

import { groupModule, lineModule, polylineModule, scalableTextModule, textModule,
  twoPointCircleModule, twoPointRectangleModule, viewModule } from './renderModules';

export class TikzRendererFactory {

  public constructor() {}

  public createRenderer( styleSheet: StyleSheet<GraphicStyle> ): TikzRenderer {
    const renderer = new TikzRenderer( styleSheet );

    /* The order of modules is important when there are separate render instructions for subclasses
     * of object types. */
    renderer.addRenderModule( lineModule );
    renderer.addRenderModule( twoPointRectangleModule );
    renderer.addRenderModule( polylineModule );
    renderer.addRenderModule( twoPointCircleModule );
    renderer.addRenderModule( textModule );
    renderer.addRenderModule( scalableTextModule );
    renderer.addRenderModule( groupModule );
    renderer.addRenderModule( viewModule );

    return renderer;
  }
}
