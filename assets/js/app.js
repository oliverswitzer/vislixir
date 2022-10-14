// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
import "../css/app.css"
import "../vendor/d3-msg-seq.js"


// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
import {Socket} from "phoenix";

import NodeSelector from "./node_selector";
import ClusterView from "./cluster_view";


class App {
  constructor(node_selector_container) {
    this.node_selector = new NodeSelector(node_selector_container, this.channel);
    this.cluster_view = new ClusterView($('#graph'), $('#log'));
    $('#stop_msg_tracing').click(e => {
      if (this.cluster_view)
        this.cluster_view.stopMsgTraceAll();
    });
  }
}

window.socket = new Socket("/socket");
window.socket.connect();
window.app = new App($('#node_selector'));
