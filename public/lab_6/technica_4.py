import cv2
import os

def load_images_from_folder(folder):
    images = []
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder,filename))
        if img is not None:
            images.append(img)
    return images
load_images_from_folder("Claude_Monet")




from keras.layers import Deconvolution2D, Reshape

def build_generator(start_filters, filter_size, latent_dim):
  
  # function for building a CNN block for upsampling the image
  def add_generator_block(x, filters, filter_size):
      x = Deconvolution2D(filters, filter_size, strides=2, padding='same')(x)
      x = BatchNormalization()(x)
      x = LeakyReLU(0.3)(x)
      return x

  # input is a noise vector 
  inp = Input(shape=(latent_dim,))

  # projection of the noise vector into a tensor with 
  # same shape as last conv layer in discriminator
  x = Dense(4 * 4 * (start_filters * 8), input_dim=latent_dim)(inp)
  x = BatchNormalization()(x)
  x = Reshape(target_shape=(4, 4, start_filters * 8))(x)

  # design the generator to upsample the image 4x
  x = add_generator_block(x, start_filters * 4, filter_size)
  x = add_generator_block(x, start_filters * 2, filter_size)
  x = add_generator_block(x, start_filters, filter_size)
  x = add_generator_block(x, start_filters, filter_size)    

  # turn the output into a 3D tensor, an image with 3 channels 
  x = Conv2D(3, kernel_size=5, padding='same', activation='tanh')(x)
  
  return Model(inputs=inp, outputs=x)



import pandas as pd
import os
from keras.optimizers import Adam

# load celebrity images attributes
df_celeb = pd.read_csv('artists.csv')
TOTAL_SAMPLES = df_celeb.shape[0]

# we will downscale the images
SPATIAL_DIM = 64 
# size of noise vector
LATENT_DIM_GAN = 100 
# filter size in conv layer
FILTER_SIZE = 5
# number of filters in conv layer
NET_CAPACITY = 16
# batch size
BATCH_SIZE_GAN = 32
# interval for displaying generated images
PROGRESS_INTERVAL = 80 
# directory for storing generated images
ROOT_DIR = 'visualization'
if not os.path.isdir(ROOT_DIR):
    os.mkdir(ROOT_DIR)
    


def construct_models(verbose=False):
    ### discriminator
    discriminator = build_discriminator(NET_CAPACITY, SPATIAL_DIM, FILTER_SIZE)
    # compile discriminator
    discriminator.compile(loss='binary_crossentropy', optimizer=Adam(lr=0.0002), metrics=['mae'])

    ### generator
    # do not compile generator
    generator = build_generator(NET_CAPACITY, FILTER_SIZE, LATENT_DIM_GAN)

    ### DCGAN 
    gan = Sequential()
    gan.add(generator)
    gan.add(discriminator)
    discriminator.trainable = False 
    gan.compile(loss='binary_crossentropy', optimizer=Adam(lr=0.0002), metrics=['mae'])

    if verbose: 
        generator.summary()
        discriminator.summary()
        gan.summary()
        
    return generator, discriminator, gan
  
generator_celeb, discriminator_celeb, gan_celeb = construct_models(verbose=True)