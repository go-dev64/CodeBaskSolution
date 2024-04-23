import "../styles/index.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import "../components/terminal_effect.js";
import "../../vendors/js/htmx.js";

import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers";
const Stimulus = window.Stimulus = Application.start();
const context = require.context("../controllers", true, /\.js$/);
Stimulus.load(definitionsFromContext(context));
