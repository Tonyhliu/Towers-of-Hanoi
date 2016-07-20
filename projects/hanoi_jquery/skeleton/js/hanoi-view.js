function HanoiView(game, el) {
  this.$el = el;
  this.game = game;

  this.clickTowerIndex = null;
  this.$el.on("click", "ul", this.clickTower.bind(this));

  this.setupTowers();
  this.render();
}

HanoiView.prototype.setupTowers = function(){
  this.$el.empty();
  this.$el.addClass("group");

  let $tower, $disk;
  for (let i = 0; i < 3; i++){
    $tower = $("<ul>");
    for (let j = 0; j < 3; j++){
      $disk = $("<li>");
      $tower.append($disk);
    }

    this.$el.append($tower);
  }
};

HanoiView.prototype.render = function() {
  const $towers = this.$el.find("ul");
  $towers.removeClass();

  if (this.clickTowerIndex !== null) {
    $towers.eq(this.clickTowerIdx).addClass("selected");
  }

  // disks [1, 2, 3]
  // towerIdx = 0;
  this.game.towers.forEach( (disks, towerIdx) => {
    const $disks = $towers.eq(towerIdx).children();
    $disks.removeClass();

    disks.forEach( (diskWidth, diskIdx) => {
    /*
    Since our disks are stacked from bottom to top
    as [3, 2, 1], we have to select from the back
    of our jQuery object, using negative indices.
    */
    $disks.eq(-1 * (diskIdx + 1)).addClass("disk-" + diskWidth);
  });
});


  //click --> makes move
    //disk moves, addClass to li, with disk index
      //update the size of disk from css
  // did they win?
    // repeats @ click
    //otherwise
    //figcaption set up

};

HanoiView.prototype.clickTower = function (event) {
  let index = $(event.currentTarget).index();

  if (this.clickTowerIndex === null) {
    this.clickTowerIndex = index;
  } else if (!(this.game.move(this.clickTowerIndex, index))) {
    alert("Invalid move!");
    this.clickTowerIndex = null;
  } else {
    this.game.move(this.clickTowerIndex, index);
    this.clickTowerIndex = null;
  }

  this.render();

  if (this.game.isWon()) {
    this.$el.off("click")
    this.$el.addClass("game-over");
    alert("Good work!");
  }
};

module.exports = HanoiView;
