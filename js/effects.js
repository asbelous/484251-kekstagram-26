import { imgUploadPreview } from './scale.js';

const effectLevel = document.querySelector('.effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const effectsSettings = {
  chrome: {
    effect: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterName: 'grayscale',
    unit: '',
  },
  sepia: {
    effect: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterName: 'sepia',
    unit: '',
  },
  marvin: {
    effect: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filterName: 'invert',
    unit: '%',
  },
  phobos: {
    effect: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filterName: 'blur',
    unit: 'px',
  },
  heat: {
    effect: 'heat',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filterName: 'brightness',
    unit: '',
  },
};

const applyNoneEffect = () => {
  imgUploadPreview.classList = '';
  imgUploadPreview.classList.add('effects__preview--none');
  imgUploadPreview.style.filter = '';
  effectLevelSlider.setAttribute('disabled', true);
  effectLevel.classList.add('hidden');
};

const applyEffect = ({effect, options, filterName, unit}) => {
  effectLevelSlider.removeAttribute('disabled');
  effectLevel.classList.remove('hidden');
  imgUploadPreview.classList = '';
  imgUploadPreview.classList.add(`effect__preview--${effect}`);
  effectLevelSlider.noUiSlider.updateOptions(options);
  effectLevelSlider.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `${filterName}(${effectLevelSlider.noUiSlider.get()}${unit})`;
  });
};

const onEffectChange = (evt) => {
  if (evt.target.value === 'none') {
    applyNoneEffect();
  } else {
    applyEffect(effectsSettings[evt.target.value]);
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectsList.addEventListener('change', onEffectChange);

export { applyNoneEffect };
