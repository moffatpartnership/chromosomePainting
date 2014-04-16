## Chromosome Painting

#### HTML
The index.html file contains the normal includes for the CSS and Javascript files.

As part of the copyright agreement you will have to include the text that explains the process (you'd want to do that anyway…)

First element explain the process globally

```
<div>
        <p>Our DNA is packaged up into 23 large structures called chromosomes. The first 22 chromosomes, numbered from 1 to 22 and are called the autosomes. They come in pairs: one of each pair is inherited from our mother and one from our father – so they can inform us about our overall ancestry. This analysis has separated out the DNA you inherited from your parents using a statistical model (this is called phasing) and has then gone on to infer the ancestry of each chunk of your chromosomes (using another statistical model) – that is they have been “painted” according to their ancestry.</p>
</div>
```

The next element is for the canvas.

```
<div id="canvasChromosomePainting" data-chromosome-painting-id="52a094c1939138472f000bcb">
    </div>
```

The third block is for further description of the Chromosome Painting.

```
<div>
        <p>The graphic shows the two copies of each of your autosomes, coloured according to the inferred ancestry of each segment. In the present analysis there are three possible ancestries – West Eurasian (which includes European, West Asian and some South Asian ancestry), Sub-Saharan African and East Asian (includes Native American & North Asian). Many Europeans have entirely European ancestry so the entire length of each copy of each chromosome would appear West Eurasian. However if your father were Nigerian and your mother British, one copy of each chromosome would appear Sub-Saharan African and one would appear West Eurasian. More complex mixes appear as a series of segments of differing ancestry, showing the different blocks inherited from the different ancestors. Where there are too few markers in a region, ancestry cannot be inferred – these are represented in grey. There is a considerable amount of statistical noise in this analysis, so care should be taken with interpretation of small chunks of inferred minority ancestry; these may not be real.</p>
</div>
```

The Canvas used for the plots will be created by the javascript as a child of the div element with the id canvasChromosomePainting.
There is a test AMA result id within the attribute data-global-connections-id you would replace this with the AMA result id for the customer.

###### Script tags

Jquery is used minimally and will be depreciated. (yuck)

The GSAP Greensock library is currently only used for the Ticker. The library usage will increase in future versions.

The two createjs libraries are used extensively.

You can use the stats display for performance monitoring, uncomment the initial load and jquery lines in the Viewer.loadInit function, then uncomment the start and stop lines in the frameRender function.

#### CSS

There is a very simple CSS preloader within the #Processing styling with links to two assets in the /img folder. Otherwise please note the normal canvas margin and padding fills.

#### Javascript

The javascript file haplogroupFrequencies.js has an anonymous executing function called Viewer, this loads the assets on start-up and then when all is loaded the GSAP Ticker fires the frameRender function.

There are two other anonymous functions handling the loading and the drawing.

#### Support

Email me at alan@scotlandsdna.com for any questions and usage.

©The Moffat Partnership
