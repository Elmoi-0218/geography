diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..6a83332209521c156a6f898e5b96d950c957862c
--- /dev/null
+++ b/script.js
@@ -0,0 +1,74 @@
+(() => {
+  const PLANET_SELECTOR = "input[type='radio'][name='planet']";
+
+  const getPlanetFromHash = () => {
+    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
+    if (!hash) {
+      return null;
+    }
+
+    const matchedRadio = document.getElementById(hash);
+    return matchedRadio && matchedRadio.matches(PLANET_SELECTOR) ? matchedRadio : null;
+  };
+
+  const setActivePlanet = (nextPlanet) => {
+    const planetRadios = document.querySelectorAll(PLANET_SELECTOR);
+    if (!planetRadios.length || !nextPlanet) {
+      return;
+    }
+
+    planetRadios.forEach((radio) => {
+      radio.checked = radio === nextPlanet;
+    });
+
+    document.body.dataset.activePlanet = nextPlanet.id;
+
+    if (window.location.hash !== `#${nextPlanet.id}`) {
+      window.history.replaceState(null, '', `#${nextPlanet.id}`);
+    }
+  };
+
+  const setupPlanetNavigation = () => {
+    const planetRadios = Array.from(document.querySelectorAll(PLANET_SELECTOR));
+    if (!planetRadios.length) {
+      return;
+    }
+
+    const fallbackPlanet =
+      getPlanetFromHash() ||
+      planetRadios.find((radio) => radio.checked) ||
+      document.getElementById('earth') ||
+      planetRadios[0];
+
+    setActivePlanet(fallbackPlanet);
+
+    planetRadios.forEach((radio) => {
+      radio.addEventListener('change', () => {
+        if (radio.checked) {
+          setActivePlanet(radio);
+        }
+      });
+    });
+
+    document.addEventListener('keydown', (event) => {
+      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
+        return;
+      }
+
+      const currentIndex = planetRadios.findIndex((radio) => radio.checked);
+      const direction = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
+      const nextIndex = (currentIndex + direction + planetRadios.length) % planetRadios.length;
+
+      setActivePlanet(planetRadios[nextIndex]);
+    });
+
+    window.addEventListener('hashchange', () => {
+      const hashPlanet = getPlanetFromHash();
+      if (hashPlanet) {
+        setActivePlanet(hashPlanet);
+      }
+    });
+  };
+
+  document.addEventListener('DOMContentLoaded', setupPlanetNavigation);
+})();
