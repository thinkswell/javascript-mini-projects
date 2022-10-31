const pixGrid = (function() {
  function centerImage(theImage) {
    let myDifX = (window.innerWidth - theImage.width) / 2;
            var myDifY = (window.innerHeight - theImage.height) / 2;
    return (theImage.style.top = `${myDifY  }px`), (theImage.style.left = `${myDifX  }px`), theImage;
  }
  let myNode = document.querySelector('.pixgrid');
  myNode.addEventListener(
    'click',
    function(e) {
      if (e.target.tagName === 'IMG') {
        let myOverlay = document.createElement('div');
        (myOverlay.id = 'overlay'),
          document.body.appendChild(myOverlay),
          (myOverlay.style.position = 'absolute'),
          (myOverlay.style.top = 0),
          (myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)'),
          (myOverlay.style.cursor = 'pointer'),
          (myOverlay.style.width = `${window.innerWidth  }px`),
          (myOverlay.style.height = `${window.innerHeight  }px`),
          (myOverlay.style.top = `${window.pageYOffset  }px`),
          (myOverlay.style.left = `${window.pageXOffset  }px`);
        let imageSrc = e.target.src;
                    var largeImage = document.createElement('img');
        (largeImage.id = 'largeImage'),
          (largeImage.src = `${imageSrc.substr(0, imageSrc.length - 7)  }.jpg`),
          (largeImage.style.display = 'block'),
          (largeImage.style.position = 'absolute'),
          largeImage.addEventListener('load', function() {
            this.height > window.innerHeight &&
              ((this.ratio = window.innerHeight / this.height),
              (this.height = this.height * this.ratio),
              (this.width = this.width * this.ratio)),
              this.width > window.innerWidth &&
                ((this.ratio = window.innerWidth / this.width),
                (this.height = this.height * this.ratio),
                (this.width = this.width * this.ratio)),
              centerImage(this),
              myOverlay.appendChild(largeImage);
          }),
          largeImage.addEventListener(
            'click',
            function() {
              myOverlay &&
                (window.removeEventListener('resize', window, !1),
                window.removeEventListener('scroll', window, !1),
                myOverlay.parentNode.removeChild(myOverlay));
            },
            !1
          ),
          window.addEventListener(
            'scroll',
            function() {
              myOverlay &&
                ((myOverlay.style.top = `${window.pageYOffset  }px`),
                (myOverlay.style.left = `${window.pageXOffset  }px`));
            },
            !1
          ),
          window.addEventListener(
            'resize',
            function() {
              myOverlay &&
                ((myOverlay.style.width = `${window.innerWidth  }px`),
                (myOverlay.style.height = `${window.innerHeight  }px`),
                (myOverlay.style.top = `${window.pageYOffset  }px`),
                (myOverlay.style.left = `${window.pageXOffset  }px`),
                centerImage(largeImage));
            },
            !1
          );
      }
    },
    !1
  );
})();
