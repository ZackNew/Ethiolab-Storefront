<template>
  <div class="sf-store-locator">
    <div class="sf-store-locator__wrapper">
      <div class="sf-store-locator__list">
        <div class="sf-store-locator__stores">
          Stores found: <span>{{ stores.length }}</span>
        </div>
        <slot
          v-bind="{
            centerOn,
            registerStore,
            removeStore,
            userPosition,
            getGeoDistance,
            locateUser,
          }"
        />
      </div>
      <div class="sf-store-locator__map-wrapper">
        <no-ssr>
          <LMap
            v-if="loaded"
            ref="map"
            class="sf-store-locator__map"
            :options="computedMapOptions"
            :center.sync="internalCenter"
            :zoom.sync="internalZoom"
            :max-zoom="maxZoom"
            @ready="onMapReady"
            @locationfound="locationFound"
            @locationerror="locationError"
          >
            <LTileLayer
              v-bind="tileLayerOptions"
              :url="tileServerUrl"
              :attribution="tileServerAttribution"
            />
            <LControlZoom position="topleft" />
            <LMarker
              v-for="(store, index) in stores"
              :key="index"
              :lat-lng="store.latlng"
              v-bind="markerOptions"
            >
              <LIcon :icon-anchor="markerIconAnchor">
                <slot name="marker-icon">
                  <SfIcon
                    color="#C41E3A"
                    size="xl3"
                    v-focus
                    :aria-label="`${store.name} located at ${store.address}`"
                    icon="marker_fill"
                    tabindex="0"
                  />
                </slot>
              </LIcon>
            </LMarker>
          </LMap>
        </no-ssr>
        <slot name="map-loading">
          <SfLoader
            :class="{ 'display-none': mapReady }"
            class="sf-store-locator__loader"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
// import { Icon } from 'leaflet';
import { SfIcon, SfLoader, focus, SfStore } from '@storefront-ui/vue';
// delete Icon.Default.prototype._getIconUrl;
// if (process.client) {
//   Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   });
// }

Vue.component('SfStore', SfStore);
export default {
  name: 'StoreLocator',
  provide() {
    const locatorData = {};
    Object.defineProperty(locatorData, 'userPosition', {
      enumerable: true,
      get: () => this.userPosition,
    });
    return {
      registerStore: this.registerStore,
      removeStore: this.removeStore,
      centerOn: this.centerOn,
      getGeoDistance: this.getGeoDistance,
      locateUser: this.locateUser,
      locatorData,
    };
  },
  components: {
    SfIcon,
    SfLoader,
  },
  directives: {
    focus,
  },
  props: {
    tileServerUrl: {
      type: String,
      default:
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    },
    tileServerAttribution: {
      type: String,
      default: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    },
    center: {
      type: [Array, Object],
      default: () => [0, 0],
    },
    zoom: {
      type: Number,
      default: 6,
    },
    maxZoom: {
      type: Number,
      default: 16,
    },
    markerIconSize: {
      type: Array,
      default: () => [41, 48],
    },
    markerIconAnchor: {
      type: Array,
      default: () => [10.5, 0],
    },
    mapOptions: {
      type: Object,
      default: () => ({}),
    },
    tileLayerOptions: {
      type: Object,
      default: () => ({}),
    },
    markerOptions: {
      type: Object,
      default: () => ({}),
    },
    flyToStoreZoom: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      loaded: false,
      userPosition: null,
      mapReady: false,
      stores: [],
    };
  },
  computed: {
    computedMapOptions() {
      return { zoomControl: false, ...this.mapOptions };
    },
    internalCenter: {
      get() {
        return this.center;
      },
      set(value) {
        this.updateCenter(value);
      },
    },
    internalZoom: {
      get() {
        return this.zoom;
      },
      set(value) {
        this.$emit('update:zoom', value);
      },
    },
  },
  mounted() {
    if (process.client) {
      import('leaflet/dist/leaflet.css');
      import('vue2-leaflet').then(
        ({ LMap, LTileLayer, LMarker, LIcon, LControl, LControlZoom }) => {
          Vue.component('LMap', LMap);
          Vue.component('LTileLayer', LTileLayer);
          Vue.component('LMarker', LMarker);
          Vue.component('LIcon', LIcon);
          Vue.component('LControl', LControl);
          Vue.component('LControlZoom', LControlZoom);
          this.loaded = true;
          /**
           * Library loaded event, the library is ready and the map is initialising
           *
           * @event 'library:loaded'
           * @type null
           */
          this.$emit('library:loaded');
        }
      );
    }
  },
  methods: {
    latLngEquality(a, b) {
      return a.latlng[0] === b.latlng[0] && a.latlng[1] === b.latlng[1];
    },
    registerStore(store) {
      if (!this.stores.some((s) => this.latLngEquality(store, s))) {
        this.stores = [...this.stores, store];
      }
    },
    removeStore(store) {
      this.stores = this.stores.filter((s) => !this.latLngEquality(s, store));
    },
    onMapReady(mapObject) {
      /**
       * Map ready and displayed event
       *
       * @event 'map:ready'
       * @type {object}
       */
      this.mapReady = true;
      this.$emit('map:ready', mapObject);
      this.locateUser();
    },
    locateUser() {
      this.$refs.map.mapObject.locate({ timeout: 20000 });
    },
    locationFound(location) {
      this.userPosition = { ...location.latlng };
      /**
       * Update center with user position event,
       *
       * @event 'update:center'
       * @type {object}
       */
      this.updateCenter({ ...location.latlng });
    },
    locationError(error) {
      /**
       * Location error event.
       *
       * @event 'location:errors'
       * @type {object}
       */
      this.$emit('location:error', error);
    },
    updateCenter(latlng) {
      this.$emit('update:center', { ...latlng });
    },
    centerOn(latlng) {
      this.$refs.map.mapObject.flyTo(latlng, this.flyToStoreZoom);
    },
    getGeoDistance(start, end) {
      const deg2rad = (deg) => deg * (Math.PI / 180);
      const R = 6371;
      const dLat = deg2rad(end.lat - start.lat);
      const dLng = deg2rad(end.lng - start.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(start.lat)) *
          Math.cos(deg2rad(end.lat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c * 1000;
      distance = distance / 1000;
      return Math.round(distance * 100) / 100;
    },
  },
};
</script>
<style lang="scss">
.sf-store {
  display: flex;
  flex-wrap: wrap;
  padding: var(--store-padding, 0 0 var(--spacer-sm) 0);
  margin: var(--store-margin, var(--spacer-sm) 0 0 0);
  @include border(--store-border, 0 0 1px 0, solid, var(--c-light));
  &__distance {
    flex: var(--store-distance-flex, 0 0 100%);
    order: var(--store-distance-order);
    margin: var(--store-distance-margin, 0 0 var(--spacer-xs) 0);
    text-align: var(--store-distance-text-align, left);
    color: var(--c-text);
    @include font(
      --store-item-distance-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.4,
      var(--font-family--secondary)
    );
    span {
      font-weight: var(--store-distance-span, var(--font-weight--normal));
      color: var(--c-text);
    }
  }
  &__btn {
    display: flex;
    justify-content: flex-start;
  }
  &__media {
    flex: var(--store-media-flex, 0 0 5.125rem);
    margin: var(--store-media-margin, 0 var(--spacer-xs) 0 0);
  }
  &__icon {
    margin: var(--store-icon-padding, var(--spacer-xl));
  }
  &__address {
    margin: var(--store-item-addres-margin, 0 0 var(--spacer-base) 0);
    color: var(--c-link);
    @include font(
      --store-item-property-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.4,
      var(--font-family--primary)
    );
  }
  &__name {
    margin: var(--store-item-name-margin, 0);
    color: var(--store-item-name-color, var(--c-text));
    @include font(
      --store-item-property-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.4,
      var(--font-family--secondary)
    );
  }
  &__property {
    display: flex;
    align-items: center;
    margin: var(--store-item-property-margin, 0 0 var(--spacer-sm) 0);
    color: var(--c-dark-variant);
    @include font(
      --store-item-property-font,
      var(--font-weight--medium),
      var(--font-size--xs),
      1.4,
      var(--font-family--secondary)
    );
    &:last-child {
      margin: var(--store-item-property-margin, 0);
    }
  }
  &__property-link {
    color: var(--c-link);
    text-decoration: none;
  }
  @include for-desktop {
    --store-distance-flex: 1 0 0;
    --store-distance-order: 1;
    --store-distance-margin: 0 0 0 0;
    --store-distance-text-align: right;
    --store-padding: 0 0 var(--spacer-2xs) 0;
  }
}
.sf-store-locator {
  &__wrapper {
    display: flex;
    flex-direction: var(--store-locator-wrapper-flex-direction, column-reverse);
    justify-content: var(--store-locator-wrapper-justify-content, flex-start);
    align-items: var(--store-locator-wrapper-align-items, flex-start);
  }
  &__list {
    flex: var(--store-locator-list-flex);
    padding: var(--store-locator-list-padding, 0 var(--spacer-sm));
    margin: var(--store-locator-list-margin);
  }
  &__map-wrapper {
    position: relative;
    flex: var(--store-locator-map-flex, 0 0 60vh);
    width: var(--store-locator-map-width, 100%);
    height: var(--store-locator-map-height);
  }
  &__map {
    // Workaround to known bug about min-height / height interaction in Chrome / Firefox
    position: absolute;
    height: 100%;
    z-index: 0;
  }
  &__stores {
    width: var(--store-locator-stores-width, 100%);
    padding: var(
      --store-locator-stores-padding,
      var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-sm)
    );
    margin: var(--store-locator-stores-margin);
    @include border(
      --store-locator-stores-border,
      0 0 2px 0,
      solid,
      var(--c-primary)
    );
    color: var(--store-locator-store-color, var(--c-text));
    @include font(
      --store-locator-stores-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.4,
      var(--font-family--secondary)
    );
    span {
      font-weight: var(--font-weight--bold);
      color: var(--c-text);
    }
  }
  @include for-desktop {
    --store-locator-stores-width: calc(100% - var(--spacer-sm));
    --store-item-name-color: var(--c-link);
    --store-locator-wrapper-flex-direction: row;
    --store-locator-list-flex: 1;
    --store-locator-list-padding: 0;
    --store-locator-list-margin: 0 var(--spacer-sm) 0 0;
    --store-locator-map-flex: 1;
    --store-locator-map-height: 46.25rem;
  }
}
</style>
