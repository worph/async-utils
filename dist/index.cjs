var o=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var q=(i,e)=>{for(var t in e)o(i,t,{get:e[t],enumerable:!0})},d=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of p(e))!f.call(i,r)&&r!==t&&o(i,r,{get:()=>e[r],enumerable:!(s=m(e,r))||s.enumerable});return i};var w=i=>d(o({},"__esModule",{value:!0}),i);var P={};q(P,{ListenerCleaner:()=>l,MultiQueue:()=>c,PromiseQueue:()=>u,makeid:()=>n});module.exports=w(P);var l=class{cleaners=[];add(e){this.cleaners.push(e)}cleaner(){return()=>{this.cleanUp()}}cleanUp(){for(let e of this.cleaners)e();this.cleaners=[]}};function n(i){let e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=t.length;for(let r=0;r<i;r++)e+=t.charAt(Math.floor(Math.random()*s));return e}var u=class{constructor(e=!1){this.onlyLast=e;this.cancelAll()}nextPromise=Promise.resolve(null);canceled={};queueSize=0;queueID=0;getQueueSize(){return this.queueSize}async awaitQueueEmpty(){for(await this.nextPromise;this.queueSize!=0;)await this.nextPromise}add(e,t=null){t||(t="promise-"+n(8));let s=this.nextPromise;this.queueSize++;let r=this.queueID,a=null;return a=(async()=>{this.queueSize--;try{await s}catch{}if(r!==this.queueID)throw new Error("canceled caused by new queue");if(this.canceled[t])throw delete this.canceled[t],new Error("canceled by user");if(this.onlyLast&&a!=this.nextPromise)throw new Error("canceled caused by not last");return e()})(),a.catch(h=>{}),this.nextPromise=a,{id:t,promise:this.nextPromise}}cancel(e){this.canceled[e]=!0}async cancelAll(){this.queueID++,await this.awaitQueueEmpty(),this.nextPromise=Promise.resolve(null),this.canceled={},this.queueSize=0}};var c=class{queues;constructor(e=1){if(e<1)throw new Error("concurrentTask must be >=1");this.queues=[];for(let t=0;t<e;t++)this.queues.push(new u)}getQueueSize(){let e=0;for(let t of this.queues)e+=t.getQueueSize();return e}async awaitQueueEmpty(){for(let e of this.queues)await e.awaitQueueEmpty()}add(e,t=null){let s=this.queues[0];for(let r=1;r<this.queues.length;r++)this.queues[r].getQueueSize()<s.getQueueSize()&&(s=this.queues[r]);return s.add(e,t)}cancel(e){for(let t of this.queues)t.cancel(e)}async cancelAll(){for(let e of this.queues)await e.cancelAll()}};0&&(module.exports={ListenerCleaner,MultiQueue,PromiseQueue,makeid});
//# sourceMappingURL=index.cjs.map