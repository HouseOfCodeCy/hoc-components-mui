// Import FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

/********************** COMPONENTS ***********************/
import AddAddressButton from './components/Account/Address/AddAddressButton';
import AddressList from './components/Account/Address/AddressList/AddressList';
import AddressSelection from './components/Account/Address/AddressSelection/AddressSelection';
import EditAddressDialog from './components/Account/Address/EditAddress';
import HButton from './components/Button/Button';
import SelectButton from './components/Button/SelectButton';
import CartDetails from './components/Cart/CartDetails';
import CartTotal from './components/Cart/CartTotal';
import DeliverMethod from './components/Cart/DeliverMethod';
import DeliverMethodOptions from './components/Cart/DeliverMethodOptions.';
import QuantityComponent from './components/Cart/QuantityComponent';
import ShoppingCartFooter from './components/Cart/ShoppingCartFooter';
import ShoppingCartItem from './components/Cart/ShoppingCartItem';
import ShoppingCartItems from './components/Cart/ShoppingCartItems';
import DraggableCategories from './components/Categories/DraggableCategories';
import OrderShippingMethod from './components/Order/OrderShippingMethod';
import OrderStepper from './components/Order/OrderStepper';
import PayButtonCash from './components/Payment/PayButtonCash';
import PaymentMethod from './components/Payment/PaymentMethod/PaymentMethod';
import FavoriteProductItem from './components/Product/FavoriteProductItem/FavoriteProductItem';
import OrderItem from './components/Product/OrderItem/OrderItem';
import ProductItem from './components/Product/ProductItem/ProductItem';
import AddReview from './components/Product/Reviews/AddReview';
import EditReview from './components/Product/Reviews/EditReview';
import ReviewComponent from './components/Product/Reviews/ReviewComponent';
import ReviewRating from './components/Product/Reviews/ReviewRating';
import ReviewsAccordion from './components/Product/Reviews/ReviewsAccordion';
import ReviewsButton from './components/Product/Reviews/ReviewsButton';
import ReviewsHeader from './components/Product/Reviews/ReviewsHeader';
import ReviewsItem from './components/Product/Reviews/ReviewsItem';
import AddToCartButton from './components/Product/common/AddToCartButton';
import AccordionComponent from './components/common/AccordionComponent';
import CardRow from './components/common/CardRow';
import CarouselComponent from './components/common/CarouselComponent';
import FullScreenDialog from './components/common/Dialog/FullScreenDialog';
import SimpleDialog from './components/common/Dialog/SimpleDialog';
import HChip from './components/common/HChip';
import HNavigation from './components/common/HNavigation';
import HNavigationDesktop from './components/common/HNavigationDesktop';
import HeadMeta from './components/common/HeadMeta';
import Loading from './components/common/Loading';
import ResponseMeta from './components/common/ResponseMeta';
import TextFieldSelect from './components/common/TextFieldSelect';
/********************** PROVIDERS ***********************/
import { SnackBarProvider, useSnackBar } from './providers/SnackBarProvider';

export {
	AccordionComponent,
	AddAddressButton,
	AddReview,
	AddToCartButton,
	AddressList,
	AddressSelection,
	CardRow,
	CarouselComponent,
	CartDetails,
	CartTotal,
	DeliverMethod,
	DeliverMethodOptions,
	DraggableCategories,
	EditAddressDialog,
	EditReview,
	FavoriteProductItem,
	FullScreenDialog,
	HButton,
	HChip,
	HNavigation,
	HNavigationDesktop,
	HeadMeta,
	Loading,
	OrderItem,
	OrderShippingMethod,
	OrderStepper,
	PayButtonCash,
	PaymentMethod,
	ProductItem,
	QuantityComponent,
	ResponseMeta,
	ReviewComponent,
	ReviewRating,
	ReviewsAccordion,
	ReviewsButton,
	ReviewsHeader,
	ReviewsItem,
	SelectButton,
	ShoppingCartFooter,
	ShoppingCartItem,
	ShoppingCartItems,
	SimpleDialog,
	SnackBarProvider,
	TextFieldSelect,
	useSnackBar,
};
