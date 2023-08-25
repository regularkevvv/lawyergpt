/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */
import createKindeClient from "@kinde-oss/kinde-auth-pkce-js";
import fetch from "node-fetch";

(async () => {
  const kinde = await createKindeClient({
    client_id: "997fbb124dc543bba003fac9d8fadd79",
    domain: "https://kevintest.kinde.com",
    // eslint-disable-next-line no-undef
    redirect_uri: "https://lawyergptdemo.usuarios.minube.pe",
  });
})();

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    const sideload = document.getElementById("sideload-msg");
    const appBody = document.getElementById("app-body");
    const runButton = document.getElementById("run");
    if (sideload != null) {
      sideload.style.display = "none";
    }
    if (appBody != null) {
      appBody.style.display = "flex";
    }
    if (runButton != null) {
      runButton.onclick = run;
    }
  }
});

const endpoint = "/lawyer";

export async function run() {
  return Word.run(async (context) => {
    /**
     * Insert your Word code here
     */
    let answer: string;

    const selectionRange = context.document.getSelection();
    selectionRange.load("text");
    await context.sync();
    const selection: string = selectionRange.text;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initial_text: selection }),
      }).then((res) => res.json());

      answer = response.sugggestion;
    } catch (error: any) {
      answer = error.message;
    }

    const newText = context.document.getSelection().insertText(answer, Word.InsertLocation.after);

    // change the paragraph color to blue.
    newText.font.color = "blue";

    await context.sync();
  });
}
