import{b as f,U as at,T as le,M as v,n as G,i as Re,K as T,v as S,a8 as Ue,x as te,w as q,B as Me,D as E,af as ce,R as N,ag as F,o as I,ah as it,a1 as Be,ai as de,a as O,aj as ot,ak as re,O as Q,al as A,h as he,d as k,u as ne,z as ut,y as lt,a0 as J,am as ct,p as Fe,t as Ge,aa as De,ad as Ae,an as ke,q as dt,s as ht,ab as ft,ac as pt,ae as mt,ao as gt,ap as xt,aq as Z,G as _t,ar as bt,a5 as fe,as as pe,e as y,at as yt}from"./index-BdBA2MRA.js";import{S as L,c as V,a as Tt,b as vt,B as ze}from"./colorToUniform-DmtBy-2V.js";class Ie{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;t=n,r=s}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Ie.extension=f.Application;class Oe{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,at.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?le.shared:new le,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Oe.extension=f.Application;class Le{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Le.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"filter"};const me=new v;function Ct(o,e){e.clear();const t=e.matrix;for(let r=0;r<o.length;r++){const n=o[r];if(n.globalDisplayStatus<7)continue;const s=n.renderGroup??n.parentRenderGroup;s!=null&&s.isCachedAsTexture?e.matrix=me.copyFrom(s.textureOffsetInverseTransform).append(n.worldTransform):s!=null&&s._parentCacheAsTextureRenderGroup?e.matrix=me.copyFrom(s._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(n.groupTransform):e.matrix=n.worldTransform,e.addBounds(n.bounds)}return e.matrix=t,e}const wt=new Ue({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Pt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Me,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}class Ee{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new G({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Re({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,n=this._pushFilterData();n.skip=!1,n.filters=r,n.container=e.container,n.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,a=s.resolution,i=s.antialias;if(r.length===0){n.skip=!0;return}const l=n.bounds;if(this._calculateFilterArea(e,l),this._calculateFilterBounds(n,t.renderTarget.rootViewPort,i,a,1),n.skip)return;const u=this._getPreviousFilterData(),d=this._findFilterResolution(a);let c=0,h=0;u&&(c=u.bounds.minX,h=u.bounds.minY),this._calculateGlobalFrame(n,c,h,d,s.width,s.height),this._setupFilterTextures(n,l,t,u)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const n=e.source,s=n.resolution,a=n.antialias;if(t.length===0)return r.skip=!0,e;const i=r.bounds;if(i.addRect(e.frame),this._calculateFilterBounds(r,i.rectangle,a,s,0),r.skip)return e;const l=s;this._calculateGlobalFrame(r,0,0,l,n.width,n.height),r.outputRenderSurface=T.getOptimalTexture(i.width,i.height,r.resolution,r.antialias),r.backTexture=S.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const h=r.outputRenderSurface;return h.source.alphaMode="premultiplied-alpha",h}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const n=e.colorTexture.source._resolution,s=T.getOptimalTexture(t.width,t.height,n,!1);let a=t.minX,i=t.minY;r&&(a-=r.minX,i-=r.minY),a=Math.floor(a*n),i=Math.floor(i*n);const l=Math.ceil(t.width*n),u=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:a,y:i},{width:l,height:u},{x:0,y:0}),s}applyFilter(e,t,r,n){const s=this.renderer,a=this._activeFilterData,l=a.outputRenderSurface===r,u=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,d=this._findFilterResolution(u);let c=0,h=0;if(l){const p=this._findPreviousFilterOffset();c=p.x,h=p.y}this._updateFilterUniforms(t,r,a,c,h,d,l,n),this._setupBindGroupsAndRender(e,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,n=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(v.shared),a=t.renderGroup||t.parentRenderGroup;return a&&a.cacheToLocalTransform&&s.prepend(a.cacheToLocalTransform),s.invert(),n.prepend(s),n.scale(1/t.texture.orig.width,1/t.texture.orig.height),n.translate(t.anchor.x,t.anchor.y),n}destroy(){}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const n=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(n,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:wt,shader:e,state:e._state,topology:"triangle-list"}),r.type===te.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,n){if(e.backTexture=S.EMPTY,e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,n==null?void 0:n.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,n,s,a){const i=e.globalFrame;i.x=t*n,i.y=r*n,i.width=s*n,i.height=a*n}_updateFilterUniforms(e,t,r,n,s,a,i,l){const u=this._filterGlobalUniforms.uniforms,d=u.uOutputFrame,c=u.uInputSize,h=u.uInputPixel,p=u.uInputClamp,x=u.uGlobalFrame,_=u.uOutputTexture;i?(d[0]=r.bounds.minX-n,d[1]=r.bounds.minY-s):(d[0]=0,d[1]=0),d[2]=e.frame.width,d[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],h[0]=e.source.pixelWidth,h[1]=e.source.pixelHeight,h[2]=1/h[0],h[3]=1/h[1],p[0]=.5*h[2],p[1]=.5*h[3],p[2]=e.frame.width*c[2]-.5*h[2],p[3]=e.frame.height*c[3]-.5*h[3];const g=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=n*a,x[1]=s*a,x[2]=g.source.width*a,x[3]=g.source.height*a,t instanceof S&&(t.source.resource=null);const m=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!l),t instanceof S?(_[0]=t.frame.width,_[1]=t.frame.height):(_[0]=m.width,_[1]=m.height),_[2]=m.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const n=this._filterStack[r];if(!n.skip){e=n.bounds.minX,t=n.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Ct(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,n=e.bounds,s=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),s.length===1)s[0].apply(this,r,e.outputRenderSurface,t);else{let a=e.inputTexture;const i=T.getOptimalTexture(n.width,n.height,a.source._resolution,!1);let l=i,u=0;for(u=0;u<s.length-1;++u){s[u].apply(this,a,l,!0);const c=a;a=l,l=c}s[u].apply(this,a,e.outputRenderSurface,t),T.returnTexture(i)}}_calculateFilterBounds(e,t,r,n,s){var _;const a=this.renderer,i=e.bounds,l=e.filters;let u=1/0,d=0,c=!0,h=!1,p=!1,x=!0;for(let g=0;g<l.length;g++){const m=l[g];if(u=Math.min(u,m.resolution==="inherit"?n:m.resolution),d+=m.padding,m.antialias==="off"?c=!1:m.antialias==="inherit"&&c&&(c=r),m.clipToViewport||(x=!1),!!!(m.compatibleRenderers&a.type)){p=!1;break}if(m.blendRequired&&!(((_=a.backBuffer)==null?void 0:_.useBackBuffer)??!0)){q("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=m.enabled||p,h||(h=m.blendRequired)}if(!p){e.skip=!0;return}if(x&&i.fitBounds(0,t.width/n,0,t.height/n),i.scale(u).ceil().scale(1/u).pad((d|0)*s),!i.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=u,e.blendRequired=h}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Pt),this._filterStackIndex++,e}}Ee.extension={type:[f.WebGLSystem,f.WebGPUSystem],name:"filter"};let U=null,w=null;function St(o,e){U||(U=E.get().createCanvas(256,128),w=U.getContext("2d",{willReadFrequently:!0}),w.globalCompositeOperation="copy",w.globalAlpha=1),(U.width<o||U.height<e)&&(U.width=ce(o),U.height=ce(e))}function ge(o,e,t){for(let r=0,n=4*t*e;r<e;++r,n+=4)if(o[n+3]!==0)return!1;return!0}function xe(o,e,t,r,n){const s=4*e;for(let a=r,i=r*s+4*t;a<=n;++a,i+=s)if(o[i+3]!==0)return!1;return!0}function Rt(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,r=Math.min(e.resolution??1,1),n=e.width??t.width,s=e.height??t.height;let a=e.output;if(St(n,s),!w)throw new TypeError("Failed to get canvas 2D context");w.drawImage(t,0,0,n,s,0,0,n*r,s*r);const l=w.getImageData(0,0,n,s).data;let u=0,d=0,c=n-1,h=s-1;for(;d<s&&ge(l,n,d);)++d;if(d===s)return N.EMPTY;for(;ge(l,n,h);)--h;for(;xe(l,n,u,d,h);)++u;for(;xe(l,n,c,d,h);)--c;return++c,++h,w.globalCompositeOperation="source-over",w.strokeRect(u,d,c-u,h-d),w.globalCompositeOperation="copy",a??(a=new N),a.set(u/r,d/r,(c-u)/r,(h-d)/r),a}const _e=new N;class Ut{getCanvasAndContext(e){const{text:t,style:r,resolution:n=1}=e,s=r._getFinalPadding(),a=F.measureText(t||" ",r),i=Math.ceil(Math.ceil(Math.max(1,a.width)+s*2)*n),l=Math.ceil(Math.ceil(Math.max(1,a.height)+s*2)*n),u=I.getOptimalCanvasAndContext(i,l);this._renderTextToCanvas(t,r,s,n,u);const d=r.trim?Rt({canvas:u.canvas,width:i,height:l,resolution:1,output:_e}):_e.set(0,0,i,l);return{canvasAndContext:u,frame:d}}returnCanvasAndContext(e){I.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,r,n,s){var R,D,C,B;const{canvas:a,context:i}=s,l=it(t),u=F.measureText(e||" ",t),d=u.lines,c=u.lineHeight,h=u.lineWidths,p=u.maxLineWidth,x=u.fontProperties,_=a.height;if(i.resetTransform(),i.scale(n,n),i.textBaseline=t.textBaseline,(R=t._stroke)!=null&&R.width){const P=t._stroke;i.lineWidth=P.width,i.miterLimit=P.miterLimit,i.lineJoin=P.join,i.lineCap=P.cap}i.font=l;let g,m;const M=t.dropShadow?2:1;for(let P=0;P<M;++P){const ae=t.dropShadow&&P===0,W=ae?Math.ceil(Math.max(1,_)+r*2):0,tt=W*n;if(ae){i.fillStyle="black",i.strokeStyle="black";const b=t.dropShadow,rt=b.color,nt=b.alpha;i.shadowColor=Be.shared.setValue(rt).setAlpha(nt).toRgbaString();const st=b.blur*n,ue=b.distance*n;i.shadowBlur=st,i.shadowOffsetX=Math.cos(b.angle)*ue,i.shadowOffsetY=Math.sin(b.angle)*ue+tt}else{if(i.fillStyle=t._fill?de(t._fill,i,u,r*2):null,(D=t._stroke)!=null&&D.width){const b=t._stroke.width*.5+r*2;i.strokeStyle=de(t._stroke,i,u,b)}i.shadowColor="black"}let ie=(c-x.fontSize)/2;c-x.fontSize<0&&(ie=0);const oe=((C=t._stroke)==null?void 0:C.width)??0;for(let b=0;b<d.length;b++)g=oe/2,m=oe/2+b*c+x.ascent+ie,t.align==="right"?g+=p-h[b]:t.align==="center"&&(g+=(p-h[b])/2),(B=t._stroke)!=null&&B.width&&this._drawLetterSpacing(d[b],t,s,g+r,m+r-W,!0),t._fill!==void 0&&this._drawLetterSpacing(d[b],t,s,g+r,m+r-W)}}_drawLetterSpacing(e,t,r,n,s,a=!1){const{context:i}=r,l=t.letterSpacing;let u=!1;if(F.experimentalLetterSpacingSupported&&(F.experimentalLetterSpacing?(i.letterSpacing=`${l}px`,i.textLetterSpacing=`${l}px`,u=!0):(i.letterSpacing="0px",i.textLetterSpacing="0px")),l===0||u){a?i.strokeText(e,n,s):i.fillText(e,n,s);return}let d=n;const c=F.graphemeSegmenter(e);let h=i.measureText(e).width,p=0;for(let x=0;x<c.length;++x){const _=c[x];a?i.strokeText(_,d,s):i.fillText(_,d,s);let g="";for(let m=x+1;m<c.length;++m)g+=c[m];p=i.measureText(g).width,d+=h-p+l,h=p}}}const Y=new Ut,be="http://www.w3.org/2000/svg",ye="http://www.w3.org/1999/xhtml";class Ve{constructor(){this.svgRoot=document.createElementNS(be,"svg"),this.foreignObject=document.createElementNS(be,"foreignObject"),this.domElement=document.createElementNS(ye,"div"),this.styleElement=document.createElementNS(ye,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(n),this.image=E.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let Te;function Mt(o,e,t,r){r||(r=Te||(Te=new Ve));const{domElement:n,styleElement:s,svgRoot:a}=r;n.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${o}</div>`,n.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(s.textContent=t),document.body.appendChild(a);const i=n.getBoundingClientRect();a.remove();const l=e.padding*2;return{width:i.width-l,height:i.height-l}}class Bt{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{O.return(e)}),this.batches.length=0}}class We{constructor(e,t){this.state=L.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||r!==n.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let n=0;n<r.length;n++){const s=r[n];s._batcher.updateElement(s)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const s=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const a=s.resources.localUniforms.uniforms;a.uTransformMatrix=e.groupTransform,a.uRound=t._roundPixels|e._roundPixels,V(e.groupColorAlpha,a.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,n=this._getGpuDataForRenderable(e).batches;for(let s=0;s<n.length;s++){const a=n[s];r.addToBatch(a,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new Bt;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,n=this.renderer.graphicsContext.getGpuContext(r),s=this.renderer._roundPixels|e._roundPixels;t.batches=n.batches.map(a=>{const i=O.get(ot);return a.copyTo(i),i.renderable=e,i.roundPixels=s,i})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}We.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"graphics"};class se{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let n=r;const s=this.texture.textureMatrix;return s.isSimple||(n=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!n||n.length<r.length)&&(n=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(r,n))),n}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class ve{destroy(){}}class Ye{constructor(e,t){this.localUniforms=new G({uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Re({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,n=e.batched;if(t.batched=n,r!==n)return!0;if(n){const s=e._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const a=this._getBatchableMesh(e);return a.texture.uid!==e._texture.uid&&(a._textureMatrixUpdateId=-1),!a._batcher.checkAndUpdateTexture(a,e._texture)}return!1}addRenderable(e,t){var s,a;const r=this.renderer.renderPipes.batch,n=this._getMeshData(e);if(e.didViewUpdate&&(n.indexSize=(s=e._geometry.indices)==null?void 0:s.length,n.vertexSize=(a=e._geometry.positions)==null?void 0:a.length),n.batched){const i=this._getBatchableMesh(e);i.setTexture(e._texture),i.geometry=e._geometry,r.addToBatch(i,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=re(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),V(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ve),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ve),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new se;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Ye.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"mesh"};class Ft{execute(e,t){const r=e.state,n=e.renderer,s=t.shader||e.defaultShader;s.resources.uTexture=t.texture._source,s.resources.uniforms=e.localUniforms;const a=n.gl,i=e.getBuffers(t);n.shader.bind(s),n.state.set(r),n.geometry.bind(i.geometry,s.glProgram);const u=i.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,u,0)}}class Gt{execute(e,t){const r=e.renderer,n=t.shader||e.defaultShader;n.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),n.groups[1]=r.texture.getTextureBindGroup(t.texture);const s=e.state,a=e.getBuffers(t);r.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:s,size:t.particleChildren.length*6})}}function Ce(o,e=null){const t=o*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,n=0;r<t;r+=6,n+=4)e[r+0]=n+0,e[r+1]=n+1,e[r+2]=n+2,e[r+3]=n+0,e[r+4]=n+2,e[r+5]=n+3;return e}function Dt(o){return{dynamicUpdate:we(o,!0),staticUpdate:we(o,!1)}}function we(o,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const s in o){const a=o[s];if(e!==a.dynamic)continue;t.push(`offset = index + ${r}`),t.push(a.code);const i=Q(a.format);r+=i.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const n=t.join(`
`);return new Function("ps","f32v","u32v",n)}class At{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let n=0,s=0;for(const d in r){const c=r[d],h=Q(c.format);c.dynamic?s+=h.stride:n+=h.stride}this._dynamicStride=s/4,this._staticStride=n/4,this.staticAttributeBuffer=new A(t*4*n),this.dynamicAttributeBuffer=new A(t*4*s),this.indexBuffer=Ce(t);const a=new Ue;let i=0,l=0;this._staticBuffer=new he({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:k.VERTEX|k.COPY_DST}),this._dynamicBuffer=new he({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:k.VERTEX|k.COPY_DST});for(const d in r){const c=r[d],h=Q(c.format);c.dynamic?(a.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:i*4,format:c.format}),i+=h.size):(a.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:c.format}),l+=h.size)}a.addIndex(this.indexBuffer);const u=this.getParticleUpdate(r);this._dynamicUpload=u.dynamicUpdate,this._staticUpload=u.staticUpdate,this.geometry=a}getParticleUpdate(e){const t=kt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return Dt(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new A(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new A(this._size*this._dynamicStride*4*4),this.indexBuffer=Ce(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const n=this.staticAttributeBuffer;this._staticUpload(e,n.float32View,n.uint32View),this._staticBuffer.setDataWithSize(n.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function kt(o){const e=[];for(const t in o){const r=o[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var zt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,It=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Pe=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Ot extends ne{constructor(){const e=ut.from({vertex:It,fragment:zt}),t=lt.from({fragment:{source:Pe,entryPoint:"mainFragment"},vertex:{source:Pe,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:S.WHITE.source,uSampler:new J({}),uniforms:{uTranslationMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Be(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class He{constructor(e,t){this.state=L.for2d(),this.localUniforms=new G({uTranslationMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Ot,this.state=L.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new At({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,n=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const s=this.state;n.update(t,e._childrenDirty),e._childrenDirty=!1,s.blendMode=re(e.blendMode,e.texture._source);const a=this.localUniforms.uniforms,i=a.uTranslationMatrix;e.worldTransform.copyTo(i),i.prepend(r.globalUniforms.globalUniformData.projectionMatrix),a.uResolution=r.globalUniforms.globalUniformData.resolution,a.uRound=r._roundPixels|e._roundPixels,V(e.groupColorAlpha,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Ke extends He{constructor(e){super(e,new Ft)}}Ke.extension={type:[f.WebGLPipes],name:"particle"};class Xe extends He{constructor(e){super(e,new Gt)}}Xe.extension={type:[f.WebGPUPipes],name:"particle"};class Lt extends se{constructor(){super(),this.geometry=new ct}destroy(){this.geometry.destroy()}}class $e{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new Lt,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}$e.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"nineSliceSprite"};const Et={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Vt={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let H,K;class Wt extends ne{constructor(){H??(H=Fe({name:"tiling-sprite-shader",bits:[Tt,Et,Ge]})),K??(K=De({name:"tiling-sprite-shader",bits:[vt,Vt,Ae]}));const e=new G({uMapCoord:{value:new v,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new v,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:K,gpuProgram:H,resources:{localUniforms:new G({uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:S.EMPTY.source,uSampler:S.EMPTY.source.style}})}updateUniforms(e,t,r,n,s,a){const i=this.resources.tilingUniforms,l=a.width,u=a.height,d=a.textureMatrix,c=i.uniforms.uTextureTransform;c.set(r.a*l/e,r.b*l/t,r.c*u/e,r.d*u/t,r.tx/e,r.ty/t),c.invert(),i.uniforms.uMapCoord=d.mapCoord,i.uniforms.uClampFrame=d.uClampFrame,i.uniforms.uClampOffset=d.uClampOffset,i.uniforms.uTextureTransform=c,i.uniforms.uSizeAnchor[0]=e,i.uniforms.uSizeAnchor[1]=t,i.uniforms.uSizeAnchor[2]=n,i.uniforms.uSizeAnchor[3]=s,a&&(this.resources.uTexture=a.source,this.resources.uSampler=a.source.style)}}class Yt extends ke{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Ht(o,e){const t=o.anchor.x,r=o.anchor.y;e[0]=-t*o.width,e[1]=-r*o.height,e[2]=(1-t)*o.width,e[3]=-r*o.height,e[4]=(1-t)*o.width,e[5]=(1-r)*o.height,e[6]=-t*o.width,e[7]=(1-r)*o.height}function Kt(o,e,t,r){let n=0;const s=o.length/e,a=r.a,i=r.b,l=r.c,u=r.d,d=r.tx,c=r.ty;for(t*=e;n<s;){const h=o[t],p=o[t+1];o[t]=a*h+l*p+d,o[t+1]=i*h+u*p+c,t+=e,n++}}function Xt(o,e){const t=o.texture,r=t.frame.width,n=t.frame.height;let s=0,a=0;o.applyAnchorToTexture&&(s=o.anchor.x,a=o.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-a,e[5]=e[7]=1-a;const i=v.shared;i.copyFrom(o._tileTransform.matrix),i.tx/=o.width,i.ty/=o.height,i.invert(),i.scale(o.width/r,o.height/n),Kt(e,2,0,i)}const z=new Yt;class $t{constructor(){this.canBatch=!0,this.geometry=new ke({indices:z.indices.slice(),positions:z.positions.slice(),uvs:z.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class je{constructor(e){this._state=L.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const n=t.canBatch;if(n&&n===r){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return r!==n}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const n=this._getTilingSpriteData(e),{geometry:s,canBatch:a}=n;if(a){n.batchableMesh||(n.batchableMesh=new se);const i=n.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),i.geometry=s,i.renderable=e,i.transform=e.groupTransform,i.setTexture(e._texture)),i.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(i,t)}else r.break(t),n.shader||(n.shader=new Wt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,V(e.groupColorAlpha,r.uColor,0),this._state.blendMode=re(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:z,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:n}=t;e.didViewUpdate&&this._updateBatchableMesh(e),n._batcher.updateElement(n)}else if(e.didViewUpdate){const{shader:n}=t;n.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new $t;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,n=e.texture.source.style;n.addressMode!=="repeat"&&(n.addressMode="repeat",n.update()),Xt(e,r.uvs),Ht(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let n=!0;return this._renderer.type===te.WEBGL&&(n=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(n||r.source.isPowerOfTwo),t.canBatch}}je.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"tilingSprite"};const jt={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},qt={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Nt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},Qt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let X,$;class Jt extends ne{constructor(e){const t=new G({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});X??(X=Fe({name:"sdf-shader",bits:[dt,ht(e),jt,Nt,Ge]})),$??($=De({name:"sdf-shader",bits:[ft,pt(e),qt,Qt,Ae]})),super({glProgram:$,gpuProgram:X,resources:{localUniforms:t,batchSamplers:mt(e)}})}}class Zt extends _t{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class qe{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);Se(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);Se(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,n=gt.getFont(e.text,e._style);r.clear(),n.distanceField.type!=="none"&&(r.customShader||(r.customShader=new Jt(this._renderer.limits.maxBatchableTextures)));const s=F.graphemeSegmenter(e.text),a=e._style;let i=n.baseLineOffset;const l=xt(s,a,n,!0),u=a.padding,d=l.scale;let c=l.width,h=l.height+l.offsetY;a._stroke&&(c+=a._stroke.width/d,h+=a._stroke.width/d),r.translate(-e._anchor._x*c-u,-e._anchor._y*h-u).scale(d,d);const p=n.applyFillAsTint?a._fill.color:16777215;let x=n.fontMetrics.fontSize,_=n.lineHeight;a.lineHeight&&(x=a.fontSize/d,_=a.lineHeight/d);let g=(_-x)/2;g-n.baseLineOffset<0&&(g=0);for(let m=0;m<l.lines.length;m++){const M=l.lines[m];for(let R=0;R<M.charPositions.length;R++){const D=M.chars[R],C=n.chars[D];if(C!=null&&C.texture){const B=C.texture;r.texture(B,p||"black",Math.round(M.charPositions[R]+C.xOffset),Math.round(i+C.yOffset+g),B.orig.width,B.orig.height)}}i+=_}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Zt;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,n=Z.get(`${r}-bitmap`),{a:s,b:a,c:i,d:l}=e.groupTransform,u=Math.sqrt(s*s+a*a),d=Math.sqrt(i*i+l*l),c=(Math.abs(u)+Math.abs(d))/2,h=n.baseRenderedFontSize/e._style.fontSize,p=c*n.distanceField.range*(1/h);t.customShader.resources.localUniforms.uniforms.uDistance=p}destroy(){this._renderer=null}}qe.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"bitmapText"};function Se(o,e){e.groupTransform=o.groupTransform,e.groupColorAlpha=o.groupColorAlpha,e.groupColor=o.groupColor,e.groupBlendMode=o.groupBlendMode,e.globalDisplayStatus=o.globalDisplayStatus,e.groupTransform=o.groupTransform,e.localDisplayStatus=o.localDisplayStatus,e.groupAlpha=o.groupAlpha,e._roundPixels=o._roundPixels}class er extends ze{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function ee(o,e){const{texture:t,bounds:r}=o,n=e._style._getFinalPadding();bt(r,e._anchor,t);const s=e._anchor._x*n*2,a=e._anchor._y*n*2;r.minX-=n-s,r.minY-=n-a,r.maxX-=n-s,r.maxY-=n-a}class Ne{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,ee(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let n=this._renderer.htmlText.getTexturePromise(e);r&&(n=n.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=n,t.currentKey=e.styleKey,t.texture=await n;const s=e.renderGroup||e.parentRenderGroup;s&&(s.structureDidChange=!0),t.generatingTexture=!1,ee(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new er(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=S.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ne.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"htmlText"};function tr(){const{userAgent:o}=E.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(o)}const rr=new Me;function Qe(o,e,t,r){const n=rr;n.minX=0,n.minY=0,n.maxX=o.width/r|0,n.maxY=o.height/r|0;const s=T.getOptimalTexture(n.width,n.height,r,!1);return s.source.uploadMethodId="image",s.source.resource=o,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/r,s.frame.height=t/r,s.source.emit("update",s.source),s.updateUvs(),s}function nr(o,e){const t=e.fontFamily,r=[],n={},s=/font-family:([^;"\s]+)/g,a=o.match(s);function i(l){n[l]||(r.push(l),n[l]=!0)}if(Array.isArray(t))for(let l=0;l<t.length;l++)i(t[l]);else i(t);a&&a.forEach(l=>{const u=l.split(":")[1].trim();i(u)});for(const l in e.tagStyles){const u=e.tagStyles[l].fontFamily;i(u)}return r}async function sr(o){const t=await(await E.get().fetch(o)).blob(),r=new FileReader;return await new Promise((s,a)=>{r.onloadend=()=>s(r.result),r.onerror=a,r.readAsDataURL(t)})}async function ar(o,e){const t=await sr(e);return`@font-face {
        font-family: "${o.fontFamily}";
        font-weight: ${o.fontWeight};
        font-style: ${o.fontStyle};
        src: url('${t}');
    }`}const j=new Map;async function ir(o){const e=o.filter(t=>Z.has(`${t}-and-url`)).map(t=>{if(!j.has(t)){const{entries:r}=Z.get(`${t}-and-url`),n=[];r.forEach(s=>{const a=s.url,l=s.faces.map(u=>({weight:u.weight,style:u.style}));n.push(...l.map(u=>ar({fontWeight:u.weight,fontStyle:u.style,fontFamily:t},a)))}),j.set(t,Promise.all(n).then(s=>s.join(`
`)))}return j.get(t)});return(await Promise.all(e)).join(`
`)}function or(o,e,t,r,n){const{domElement:s,styleElement:a,svgRoot:i}=n;s.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${o}</div>`,s.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),a.textContent=r;const{width:l,height:u}=n.image;return i.setAttribute("width",l.toString()),i.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(i)}function ur(o,e){const t=I.getOptimalCanvasAndContext(o.width,o.height,e),{context:r}=t;return r.clearRect(0,0,o.width,o.height),r.drawImage(o,0,0),t}function lr(o,e,t){return new Promise(async r=>{t&&await new Promise(n=>setTimeout(n,100)),o.onload=()=>{r()},o.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,o.crossOrigin="anonymous"})}class Je{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===te.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(n=>(this._activeTextures[t].texture=n,n));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{q("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:n,textureStyle:s}=e,a=O.get(Ve),i=nr(t,r),l=await ir(i),u=Mt(t,r,l,a),d=Math.ceil(Math.ceil(Math.max(1,u.width)+r.padding*2)*n),c=Math.ceil(Math.ceil(Math.max(1,u.height)+r.padding*2)*n),h=a.image,p=2;h.width=(d|0)+p,h.height=(c|0)+p;const x=or(t,r,n,l,a);await lr(h,x,tr()&&i.length>0);const _=h;let g;this._createCanvas&&(g=ur(h,n));const m=Qe(g?g.canvas:_,h.width-p,h.height-p,n);return s&&(m.source.style=s),this._createCanvas&&(this._renderer.texture.initSource(m.source),I.returnCanvasAndContext(g)),O.return(a),m}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{q("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){T.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}Je.extension={type:[f.WebGLSystem,f.WebGPUSystem,f.CanvasSystem],name:"htmlText"};class cr extends ze{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class Ze{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e),e._didTextUpdate=!1}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey,ee(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new cr(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ze.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"text"};class et{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,n){typeof e=="string"&&(fe("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof pe||(e.style=new pe(e.style)),e.textureStyle instanceof J||(e.textureStyle=new J(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:a,textureStyle:i}=e,l=e.resolution??this._renderer.resolution,{frame:u,canvasAndContext:d}=Y.getCanvasAndContext({text:s,style:a,resolution:l}),c=Qe(d.canvas,u.width,u.height,l);if(i&&(c.source.style=i),a.trim&&(u.pad(a.padding),c.frame.copyFrom(u),c.frame.scale(1/l),c.updateUvs()),a.filters){const h=this._applyFilters(c,a.filters);return this.returnTexture(c),Y.returnCanvasAndContext(d),h}return this._renderer.texture.initSource(c._source),Y.returnCanvasAndContext(d),c}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",T.returnTexture(e,!0)}renderTextToCanvas(){fe("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,n=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),n}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}et.extension={type:[f.WebGLSystem,f.WebGPUSystem,f.CanvasSystem],name:"canvasText"};y.add(Ie);y.add(Oe);y.add(We);y.add(yt);y.add(Ye);y.add(Ke);y.add(Xe);y.add(et);y.add(Ze);y.add(qe);y.add(Je);y.add(Ne);y.add(je);y.add($e);y.add(Ee);y.add(Le);
