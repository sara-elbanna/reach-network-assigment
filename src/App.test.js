import { cleanup, render, screen } from '@testing-library/react';
import App from 'App';
import { applyMiddleware, createStore } from 'redux';
import appReducer from 'store/reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import DesktopVideosHeader from 'components/videosHeader/desktopVideosHeader';
import VideoItemComponent from 'components/searchPage/VideoItemComponent';




describe('header component', () => {
  let store = createStore(appReducer, applyMiddleware(thunkMiddleware, loadingBarMiddleware()))
  beforeEach(() => {
    render(<Provider store={store}><App /></Provider>)
  });
  afterEach(cleanup)

  it('renders search input', () => {
    const searchInputElement = screen.getByTestId('search-input')
    expect(searchInputElement).toBeInTheDocument();
  });
  it('renders search button', () => {
    const searchButtonElement = screen.getByTestId('search-button')
    expect(searchButtonElement).toBeInTheDocument();
  });
  it('renders youtube logo', () => {
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument();
  });
  it('search input initial value is empty', () => {
    expect(screen.getByTestId('search-input')).toHaveValue("");
  });

})

describe('videos header component', () => {
  let store = createStore(appReducer, applyMiddleware(thunkMiddleware, loadingBarMiddleware()))
  beforeEach(() => {
    render(<Provider store={store}>
      <DesktopVideosHeader resultsCount={'5000000'} />
    </Provider>)
  });
  afterEach(cleanup)

  it('render filtered results text', () => {
    const element = screen.getByTestId('filtered-results')
    expect(element).toBeInTheDocument();
  });
  it('render filtered results count', () => {
    const element = screen.getByTestId('filtered-results-count')
    expect(element).toHaveTextContent('5,000,000')
  });
  it('render filters button', () => {
    const element = screen.getByTestId('filters-button')
    expect(element).toBeInTheDocument();
  });

})

describe('video item component', () => {
  let store = createStore(appReducer, applyMiddleware(thunkMiddleware, loadingBarMiddleware()))
  beforeEach(() => {
    let videoItemData = {
      channelTitle: "SpongeBob SquarePants Official",
      description: "The SpongeBob SquarePants we know and love is a pretty easygoing fella...until he's not! Follow along on the Rage Gauge to see just how FURIOUS ...",
      duration: "PT12M19S",
      id: "S6Ky8mmot-I",
      publishedTime: "2020-01-16T14:00:02Z",
      thumbnailUrl: "https://i.ytimg.com/vi/S6Ky8mmot-I/mqdefault.jpg",
      title: "Every Time SpongeBob Goes Nuts! 🤬 | SpongeBob SquarePants",
      viewCount: "56113519"
    }
    render(<Provider store={store}>
      <VideoItemComponent videoItem={videoItemData} key={0} />
    </Provider>)
  });
  afterEach(cleanup)

  it('render title', () => {
    const element = screen.getByTestId('video-title')
    expect(element).toBeInTheDocument();
  });
  it('render title value', () => {
    const element = screen.getByTestId('video-title')
    expect(element).toHaveTextContent("Every Time SpongeBob Goes Nuts! 🤬 | SpongeBob SquarePants");
  });
  it('render channel title value', () => {
    const element = screen.getByTestId('video-channel-title')
    expect(element).toHaveTextContent("SpongeBob SquarePants Official");
  });
  it('render views count value', () => {
    const element = screen.getByTestId('video-views-count')
    expect(element).toHaveTextContent("56.1M views");
  });
  it('render published date value', () => {
    const element = screen.getByTestId('video-published-date')
    expect(element).toHaveTextContent("1 year ago");
  });


})


