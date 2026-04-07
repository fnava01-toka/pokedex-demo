import {
  requestAsync
} from "/util/requestAsync"

Page({
  data: {
    pokemonList: [],
  },
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.fetchData();
  },
  async fetchData() {
    const pokemon_list = await requestAsync({
      url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150',
      method: 'GET'
    }).then(result => result.data.results)
    this.setData({
      pokemonList: pokemon_list
    });

    const spritePromises = pokemon_list.map((_pokemon, index) =>
      requestAsync({
        url: `https://pokeapi.co/api/v2/pokemon/${index + 1}`,
        method: 'GET'
      }).then(result => {
        const sprite = result.data.sprites.front_default;
        this.setData({
          [`pokemonList[${index}].sprite`]: sprite
        });
      })
    );

    Promise.all(spritePromises);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});